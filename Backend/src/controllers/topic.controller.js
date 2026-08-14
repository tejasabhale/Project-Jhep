import Topic from "../models/topic.model.js";
import Lesson from "../models/lesson.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const createTopic = asyncHandler(async (req, res) => {
  const { title, description, grade, order } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Topic title is required.");
  }

  if (!grade?.trim()) {
    throw new ApiError(400, "Grade is required.");
  }

  const normalizedTitle = title.trim();
  const normalizedGrade = grade.trim();

  const existingTopic = await Topic.findOne({
    title: {
      $regex: new RegExp(`^${normalizedTitle}$`, "i"),
    },
    grade: normalizedGrade,
  });

  if (existingTopic) {
    throw new ApiError(
      409,
      `Topic "${normalizedTitle}" already exists in ${normalizedGrade}.`,
    );
  }

  if (order !== undefined) {
    const existingOrder = await Topic.findOne({
      grade: normalizedGrade,
      order: Number(order),
    });

    if (existingOrder) {
      throw new ApiError(
        409,
        `Order ${order} already exists in ${normalizedGrade}.`,
      );
    }
  }

  let thumbnail = {
    url: "",
    publicId: "",
  };

  if (req.file) {
    const uploaded = await uploadOnCloudinary(
      req.file.path,
      "image",
      "topics-thumbnail",
    );

    if (!uploaded?.secure_url) {
      throw new ApiError(500, "Failed to upload thumbnail.");
    }

    thumbnail = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  const topic = await Topic.create({
    title: normalizedTitle,
    description: description?.trim() || "",
    grade: normalizedGrade,
    order: Number(order) || 0,
    thumbnail,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, topic, "Topic created successfully."));
});

export const getTopics = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    grade,
    isPublished,
    sort = "order",
    order = "asc",
  } = req.query;

  const filter = {};

  if (search) {
    filter.title = {
      $regex: search.trim(),
      $options: "i",
    };
  }

  if (grade) {
    filter.grade = grade.trim();
  }

  if (isPublished !== undefined) {
    filter.isPublished = isPublished === "true";
  }

  const sortOptions = {
    [sort]: order === "desc" ? -1 : 1,
  };

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.max(Number(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const [topics, totalTopics] = await Promise.all([
    Topic.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber)
      .select("-__v")
      .lean(),

    Topic.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        topics,

        pagination: {
          total: totalTopics,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(totalTopics / limitNumber),
          hasNextPage: pageNumber * limitNumber < totalTopics,
          hasPrevPage: pageNumber > 1,
        },
      },
      "Topics fetched successfully.",
    ),
  );
});

export const getTopicById = asyncHandler(async (req, res) => {
  const { topicId } = req.params;

  const topic = await Topic.findById(topicId).select("-__v").lean();

  if (!topic) {
    throw new ApiError(404, "Topic not found.");
  }

  const lessonFilter = {
    topic: topicId,
  };

  // Only admins/content creators can see unpublished lessons
  if (!req.user || !["owner", "contentCreator"].includes(req.user.role)) {
    lessonFilter.isPublished = true;
  }

  const [lessons, totalLessons] = await Promise.all([
    Lesson.find(lessonFilter).sort({ order: 1 }).select("-__v").lean(),

    Lesson.countDocuments(lessonFilter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        topic,
        lessons,
        totalLessons,
      },
      "Topic fetched successfully.",
    ),
  );
});

export const updateTopic = asyncHandler(async (req, res) => {
  const { topicId } = req.params;

  const topic = await Topic.findById(topicId);

  if (!topic) {
    throw new ApiError(404, "Topic not found.");
  }

  let { title, description, grade, order, isPublished } = req.body;

  title = title?.trim();
  description = description?.trim();
  grade = grade?.trim();

  if (title) {
    const existingTopic = await Topic.findOne({
      _id: { $ne: topicId },
      grade: grade || topic.grade,
      title: {
        $regex: new RegExp(`^${title}$`, "i"),
      },
    });

    if (existingTopic) {
      throw new ApiError(
        409,
        `Topic "${title}" already exists in ${grade || topic.grade}.`,
      );
    }

    topic.title = title;
  }

  if (description !== undefined) {
    topic.description = description;
  }

  if (grade) {
    topic.grade = grade;
  }

  if (order !== undefined) {
    const existingOrder = await Topic.findOne({
      _id: { $ne: topicId },
      grade: grade || topic.grade,
      order: Number(order),
    });

    if (existingOrder) {
      throw new ApiError(
        409,
        `Order ${order} already exists in ${grade || topic.grade}.`,
      );
    }

    topic.order = Number(order);
  }

  if (typeof isPublished !== "undefined") {
    topic.isPublished = isPublished;
  }

  if (req.file) {
    const uploaded = await uploadOnCloudinary(
      req.file.path,
      "image",
      "topics-thumbnail",
    );

    if (!uploaded?.secure_url) {
      throw new ApiError(500, "Failed to upload thumbnail.");
    }

    if (topic.thumbnail?.publicId) {
      try {
        await deleteFromCloudinary(topic.thumbnail.publicId);
      } catch (error) {
        console.error("Cloudinary delete failed:", error);
      }
    }

    topic.thumbnail = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  topic.updatedBy = req.user._id;

  await topic.save();

  return res
    .status(200)
    .json(new ApiResponse(200, topic, "Topic updated successfully."));
});

export const deleteTopic = asyncHandler(async (req, res) => {
  const { topicId } = req.params;

  const topic = await Topic.findById(topicId);

  if (!topic) {
    throw new ApiError(404, "Topic not found.");
  }

  // Get all lessons of this topic
  const lessons = await Lesson.find({ topic: topicId }).select("_id");

  const lessonIds = lessons.map((lesson) => lesson._id);

  // Delete lesson contents (when you create LessonContent model)
  // await LessonContent.deleteMany({
  //   lesson: { $in: lessonIds },
  // });

  // Delete lessons
  await Lesson.deleteMany({
    topic: topicId,
  });

  // Delete topic thumbnail
  if (topic.thumbnail?.publicId) {
    try {
      await deleteFromCloudinary(topic.thumbnail.publicId);
    } catch (error) {
      console.error("Failed to delete thumbnail:", error);
    }
  }

  // Delete topic
  await topic.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Topic deleted successfully."));
});
