import Lesson from "../models/lesson.model.js";
import LessonContent from "../models/lessonContent.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const createLessonContent = asyncHandler(async (req, res) => {
  const { lesson, blockType, title, fileUrl, fileName, order } = req.body;

  if (!lesson || !blockType || !title || !fileUrl || !order) {
    throw new ApiError(
      400,
      "Lesson, title, block type, file URL and order are required.",
    );
  }

  const allowedTypes = ["ppt", "pdf", "video"];

  if (!allowedTypes.includes(blockType)) {
    throw new ApiError(400, "Invalid content type.");
  }

  const lessonExists = await Lesson.findById(lesson);

  if (!lessonExists) {
    throw new ApiError(404, "Lesson not found.");
  }

  const contentOrder = Number(order);

  if (!Number.isInteger(contentOrder) || contentOrder < 1) {
    throw new ApiError(400, "Order must be a positive integer.");
  }

  const existingContent = await LessonContent.findOne({
    lesson,
    order: contentOrder,
  });

  if (existingContent) {
    throw new ApiError(
      409,
      `Content with order ${contentOrder} already exists.`,
    );
  }

  const lessonContent = await LessonContent.create({
    lesson,
    blockType,
    title: title.trim(),
    order: contentOrder,
    createdBy: req.user._id,

    file: {
      url: fileUrl.trim(),

      provider: blockType === "video" ? "youtube" : "google-drive",

      fileName: fileName || title,

      resourceType: blockType,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        lessonContent,
        "Lesson content created successfully.",
      ),
    );
});

const getLessonContents = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  if (!lessonId) {
    throw new ApiError(400, "Lesson ID is required.");
  }

  const lesson = await Lesson.findById(lessonId)
    .populate({
      path: "topic",
      select: "title",
    })
    .select("-__v")
    .lean();

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  const contents = await LessonContent.find({
    lesson: lessonId,
  })
    .sort({
      order: 1,
    })
    .select("-__v")
    .lean();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        lesson,
        contents,
        totalContents: contents.length,
      },
      "Lesson contents fetched successfully.",
    ),
  );
});

const updateLessonContent = asyncHandler(async (req, res) => {
  const { contentId } = req.params;

  const content = await LessonContent.findById(contentId);

  if (!content) {
    throw new ApiError(404, "Lesson content not found.");
  }

  const { title, order, fileUrl, fileName } = req.body;

  if (title !== undefined) {
    content.title = title.trim();
  }

  if (order !== undefined) {
    const newOrder = Number(order);

    if (!Number.isInteger(newOrder) || newOrder < 1) {
      throw new ApiError(400, "Order must be a positive integer.");
    }

    const duplicate = await LessonContent.findOne({
      lesson: content.lesson,
      order: newOrder,
      _id: { $ne: contentId },
    });

    if (duplicate) {
      throw new ApiError(409, `Content with order ${newOrder} already exists.`);
    }

    content.order = newOrder;
  }

  if (fileUrl !== undefined) {
    content.file.url = fileUrl.trim();
  }

  if (fileName !== undefined) {
    content.file.fileName = fileName.trim();
  }

  content.file.provider =
    content.blockType === "video" ? "youtube" : "google-drive";

  content.file.resourceType = content.blockType;

  await content.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, content, "Lesson content updated successfully."),
    );
});

const deleteLessonContent = asyncHandler(async (req, res) => {
  const { contentId } = req.params;

  if (!contentId) {
    throw new ApiError(400, "Content ID is required.");
  }

  const content = await LessonContent.findById(contentId);

  if (!content) {
    throw new ApiError(404, "Lesson content not found.");
  }

  // Delete Cloudinary image only
  if (content.file?.provider === "cloudinary" && content.file?.publicId) {
    try {
      await deleteFromCloudinary(content.file.publicId);
    } catch (error) {
      console.error("Cloudinary deletion failed:", error.message);

      // Continue deleting database record
      // even if Cloudinary deletion fails
    }
  }

  await content.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Lesson content deleted successfully."));
});

const getAllLessonContents = asyncHandler(async (req, res) => {
  const contents = await LessonContent.find()
    .populate({
      path: "lesson",
      select: "title topic",
      populate: {
        path: "topic",
        select: "title grade",
      },
    })
    .sort({
      createdAt: -1,
    })
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, contents, "Lesson contents fetched successfully."),
    );
});

const getLessonContentById = asyncHandler(async (req, res) => {
  const { contentId } = req.params;

  const content = await LessonContent.findById(contentId).lean();

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, content, "Content fetched successfully"));
});

export {
  createLessonContent,
  getLessonContents,
  getLessonContentById,
  getAllLessonContents,
  updateLessonContent,
  deleteLessonContent,
};
