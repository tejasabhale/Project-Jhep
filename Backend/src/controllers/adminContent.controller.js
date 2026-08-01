import LessonContent from "../models/lessonContent.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createLessonContent = asyncHandler(async (req, res) => {
  const { lesson, blockType, title, body, file, order } = req.body;

  if (!lesson || !blockType || !title || !order) {
    throw new ApiError(400, "Lesson, block type, title and order are required");
  }

  if (["ppt", "pdf", "video"].includes(blockType) && !file?.url) {
    throw new ApiError(400, "File URL is required for this content type");
  }

  const content = await LessonContent.create({
    lesson,

    blockType,

    title,

    body,

    file,

    order,

    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, content, "Lesson content created successfully"));
});

const getLessonContents = asyncHandler(async (req, res) => {
  const contents = await LessonContent.find()
    .populate("lesson", "title")
    .populate("createdBy", "fullName")
    .sort({
      order: 1,
    });

  return res
    .status(200)
    .json(new ApiResponse(200, contents, "Contents fetched successfully"));
});

const getLessonContentById = asyncHandler(async (req, res) => {
  const content = await LessonContent.findById(req.params.id);

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, content, "Content fetched successfully"));
});

const updateLessonContent = asyncHandler(async (req, res) => {
  const content = await LessonContent.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, content, "Content updated successfully"));
});

const deleteLessonContent = asyncHandler(async (req, res) => {
  const content = await LessonContent.findByIdAndDelete(req.params.id);

  if (!content) {
    throw new ApiError(404, "Content not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Content deleted successfully"));
});

export {
  createLessonContent,
  getLessonContents,
  getLessonContentById,
  updateLessonContent,
  deleteLessonContent,
};
