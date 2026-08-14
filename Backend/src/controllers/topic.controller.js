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
  const { title, description, order, isPublished } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Topic title is required.");
  }

  const normalizedTitle = title.trim();

  const existingTopic = await Topic.findOne({
    title: {
      $regex: new RegExp(`^${normalizedTitle}$`, "i"),
    },
  });

  if (existingTopic) {
    throw new ApiError(409, `Topic "${normalizedTitle}" already exists.`);
  }

  if (order !== undefined) {
    const existingOrder = await Topic.findOne({
      order: Number(order),
    });

    if (existingOrder) {
      throw new ApiError(
        409,
        `Order ${order} is already assigned to another topic.`,
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
    order: Number(order) || 0,
    isPublished: isPublished === true || isPublished === "true",
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

  if (isPublished !== undefined) {
    filter.isPublished = isPublished === "true";
  }

  const allowedSortFields = ["title", "order", "createdAt", "updatedAt"];

  const sortField = allowedSortFields.includes(sort) ? sort : "order";

  const sortOptions = {
    [sortField]: order === "desc" ? -1 : 1,
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

  const isAdmin = req.user && ["admin", "owner"].includes(req.user.role);

  if (!isAdmin) {
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

  let { title, description, order, isPublished } = req.body;

  title = title?.trim();
  description = description?.trim();

  if (title) {
    const existingTopic = await Topic.findOne({
      _id: { $ne: topicId },
      title: {
        $regex: new RegExp(`^${title}$`, "i"),
      },
    });

    if (existingTopic) {
      throw new ApiError(409, `Topic "${title}" already exists.`);
    }

    topic.title = title;
  }

  if (description !== undefined) {
    topic.description = description;
  }

  if (order !== undefined) {
    const existingOrder = await Topic.findOne({
      _id: { $ne: topicId },
      order: Number(order),
    });

    if (existingOrder) {
      throw new ApiError(
        409,
        `Order ${order} is already assigned to another topic.`,
      );
    }

    topic.order = Number(order);
  }

  if (isPublished !== undefined) {
    topic.isPublished = isPublished === true || isPublished === "true";
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

  const hasLessons = await Lesson.exists({
    topic: topicId,
  });

  if (hasLessons) {
    throw new ApiError(
      409,
      "This topic cannot be deleted because it contains lessons. Delete all lessons first.",
    );
  }

  if (topic.thumbnail?.publicId) {
    try {
      await deleteFromCloudinary(topic.thumbnail.publicId);
    } catch (error) {
      console.error("Thumbnail delete failed:", error);
    }
  }

  await topic.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Topic deleted successfully."));
});
