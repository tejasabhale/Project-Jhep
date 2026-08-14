import mongoose from "mongoose";

import Topic from "../models/topic.model.js";
import Lesson from "../models/lesson.model.js";
import LessonContent from "../models/lessonContent.model.js";

import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createLesson = asyncHandler(async (req, res) => {
  const { topicId, title, description, order } = req.body;
  if (!topicId) {
    throw new ApiError(400, "Topic is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    throw new ApiError(400, "Invalid topic ID.");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Lesson title is required.");
  }

  const topic = await Topic.findById(topicId);

  if (!topic) {
    throw new ApiError(404, "Topic not found.");
  }

  const normalizedTitle = title.trim();

  const existingLesson = await Lesson.findOne({
    topic: topicId,
    title: {
      $regex: new RegExp(`^${normalizedTitle}$`, "i"),
    },
  });

  if (existingLesson) {
    throw new ApiError(409, "Lesson already exists in this topic.");
  }

  let lessonOrder = 1;

  if (order !== undefined) {
    lessonOrder = Number(order);

    if (Number.isNaN(lessonOrder) || lessonOrder < 1) {
      throw new ApiError(400, "Order must be a positive number.");
    }
  }

  const existingOrder = await Lesson.findOne({
    topic: topicId,
    order: lessonOrder,
  });

  if (existingOrder) {
    throw new ApiError(409, `Lesson order ${lessonOrder} already exists.`);
  }

  let thumbnail = {
    url: "",
    publicId: "",
  };

  if (req.file) {
    const uploadedThumbnail = await uploadOnCloudinary(
      req.file.path,
      "image",
      "lesson-thumbnails",
    );

    if (!uploadedThumbnail) {
      throw new ApiError(500, "Thumbnail upload failed.");
    }

    thumbnail = {
      url: uploadedThumbnail.secure_url,
      publicId: uploadedThumbnail.public_id,
    };
  }

  const lesson = await Lesson.create({
    topic: topicId,

    title: normalizedTitle,

    description: description?.trim() || "",

    order: lessonOrder,

    thumbnail,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, lesson, "Lesson created successfully."));
});

const getLessonsByTopic = asyncHandler(async (req, res) => {
  const { topicId } = req.params;

  const topic = await Topic.findById(topicId)
    .select("title description grade thumbnail")
    .lean();

  if (!topic) {
    throw new ApiError(404, "Topic not found.");
  }

  const lessons = await Lesson.find({
    topic: topicId,
  })
    .sort({
      order: 1,
    })
    .select("title description thumbnail order isPublished")
    .lean();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        topic,
        lessons,
      },
      "Lessons fetched successfully.",
    ),
  );
});

const getLessonById = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId)
    .populate({
      path: "topic",

      select: "title description grade thumbnail",
    })
    .lean();

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  const contents = await LessonContent.find({
    lesson: lessonId,

    isPublished: true,
  })
    .sort({
      order: 1,
    })
    .lean();

  const previousLesson = await Lesson.findOne({
    topic: lesson.topic._id,

    order: {
      $lt: lesson.order,
    },

    isPublished: true,
  })
    .sort({
      order: -1,
    })
    .select("_id title order")
    .lean();

  const nextLesson = await Lesson.findOne({
    topic: lesson.topic._id,

    order: {
      $gt: lesson.order,
    },

    isPublished: true,
  })
    .sort({
      order: 1,
    })
    .select("_id title order")
    .lean();

  return res.status(200).json(
    new ApiResponse(
      200,

      {
        lesson,
        contents,
        previousLesson,
        nextLesson,
      },

      "Lesson fetched successfully.",
    ),
  );
});

const updateLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  const { topicId, title, description, order, isPublished } = req.body;

  if (topicId) {
    const topic = await Topic.findById(topicId);

    if (!topic) {
      throw new ApiError(404, "Topic not found.");
    }
    lesson.topic = topicId;
  }

  if (typeof isPublished !== "undefined") {
    lesson.isPublished = isPublished === true || isPublished === "true";
  }

  if (title?.trim()) {
    const normalizedTitle = title.trim();

    const duplicate = await Lesson.findOne({
      _id: {
        $ne: lessonId,
      },

      topic: lesson.topic,

      title: {
        $regex: new RegExp(`^${normalizedTitle}$`, "i"),
      },
    });

    if (duplicate) {
      throw new ApiError(409, "Lesson already exists.");
    }

    lesson.title = normalizedTitle;
  }

  if (description !== undefined) {
    lesson.description = description.trim();
  }

  if (order !== undefined) {
    const newOrder = Number(order);

    if (Number.isNaN(newOrder) || newOrder < 1) {
      throw new ApiError(400, "Invalid order.");
    }

    const duplicateOrder = await Lesson.findOne({
      _id: {
        $ne: lessonId,
      },

      topic: lesson.topic,

      order: newOrder,
    });

    if (duplicateOrder) {
      throw new ApiError(409, "Lesson order already exists.");
    }

    lesson.order = newOrder;
  }

  if (req.file) {
    if (lesson.thumbnail?.publicId) {
      try {
        await deleteFromCloudinary(lesson.thumbnail.publicId);
      } catch (error) {
        console.log("Old thumbnail delete failed", error);
      }
    }

    const uploadedThumbnail = await uploadOnCloudinary(
      req.file.path,
      "image",
      "lesson-thumbnails",
    );

    if (!uploadedThumbnail) {
      throw new ApiError(500, "Thumbnail upload failed.");
    }

    lesson.thumbnail = {
      url: uploadedThumbnail.secure_url,

      publicId: uploadedThumbnail.public_id,
    };
  }

  await lesson.save();

  return res
    .status(200)
    .json(new ApiResponse(200, lesson, "Lesson updated successfully."));
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  if (lesson.thumbnail?.publicId) {
    try {
      await deleteFromCloudinary(lesson.thumbnail.publicId);
    } catch (error) {
      console.log("Thumbnail delete failed", error);
    }
  }

  await LessonContent.deleteMany({
    lesson: lessonId,
  });

  await lesson.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,

      null,

      "Lesson deleted successfully.",
    ),
  );
});

const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find()
    .populate("topic", "title grade")
    .select("-__v")
    .sort({
      topic: 1,
      order: 1,
    })
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, lessons, "Lessons fetched successfully."));
});

export {
  createLesson,
  getLessonsByTopic,
  getLessonById,
  updateLesson,
  deleteLesson,
  getAllLessons,
};
