import Topic from "../models/topic.model.js";
import Lesson from "../models/lesson.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createLesson = asyncHandler(async (req, res) => {
  const {
    topicId,
    title,
    description,
    order,
    fileType,
    fileName,
    fileUrl,
    fileDuration,
    isPublished,
  } = req.body;

  if (!topicId) {
    throw new ApiError(400, "Topic is required.");
  }

  const topic = await Topic.findById(topicId);

  if (!topic) {
    throw new ApiError(404, "Topic not found.");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Lesson title is required.");
  }

  const normalizedTitle = title.trim();

  const escapedTitle = normalizedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const existingLesson = await Lesson.findOne({
    topic: topicId,
    title: {
      $regex: new RegExp(`^${escapedTitle}$`, "i"),
    },
  });

  if (existingLesson) {
    throw new ApiError(409, "Lesson already exists in this topic.");
  }

  if (!fileType || !["pptx", "video"].includes(fileType)) {
    throw new ApiError(400, "Valid file type is required. Use pptx or video.");
  }

  if (!fileName?.trim()) {
    throw new ApiError(400, "File name is required.");
  }

  if (!fileUrl?.trim()) {
    throw new ApiError(400, "File URL is required.");
  }

  let lessonOrder = 1;

  if (order !== undefined && order !== "") {
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
    file: {
      type: fileType,
      name: fileName.trim(),
      url: fileUrl.trim(),
      duration: fileDuration?.trim() || "",
    },
    isPublished: isPublished === true || isPublished === "true",
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
    isPublished: true,
  })
    .sort({
      order: 1,
    })
    .select("title description thumbnail file order isPublished isFeatured")
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

  if (!lesson.topic) {
    throw new ApiError(404, "Lesson topic not found.");
  }

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

  const {
    topicId,
    title,
    description,
    order,
    isPublished,
    fileType,
    fileName,
    fileUrl,
    fileDuration,
  } = req.body;

  const newTopicId = topicId || lesson.topic;

  if (topicId) {
    const topic = await Topic.findById(topicId);

    if (!topic) {
      throw new ApiError(404, "Topic not found.");
    }

    lesson.topic = topicId;
  }

  if (typeof isPublished !== "undefined") {
    lesson.isPublished = isPublished === true || isPublished === "true";

    if (!lesson.isPublished) {
      lesson.isFeatured = false;
    }
  }

  if (title?.trim()) {
    const normalizedTitle = title.trim();

    const escapedTitle = normalizedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const duplicate = await Lesson.findOne({
      _id: {
        $ne: lessonId,
      },
      topic: newTopicId,
      title: {
        $regex: new RegExp(`^${escapedTitle}$`, "i"),
      },
    });

    if (duplicate) {
      throw new ApiError(409, "Lesson already exists in this topic.");
    }

    lesson.title = normalizedTitle;
  }

  if (description !== undefined) {
    lesson.description = description?.trim() || "";
  }

  if (order !== undefined && order !== "") {
    const newOrder = Number(order);

    if (Number.isNaN(newOrder) || newOrder < 1) {
      throw new ApiError(400, "Order must be a positive number.");
    }

    const duplicateOrder = await Lesson.findOne({
      _id: {
        $ne: lessonId,
      },
      topic: newTopicId,
      order: newOrder,
    });

    if (duplicateOrder) {
      throw new ApiError(409, `Lesson order ${newOrder} already exists.`);
    }

    lesson.order = newOrder;
  }

  if (
    fileType !== undefined ||
    fileName !== undefined ||
    fileUrl !== undefined ||
    fileDuration !== undefined
  ) {
    const updatedFileType = fileType ?? lesson.file?.type;
    const updatedFileName = fileName?.trim() || lesson.file?.name;
    const updatedFileUrl = fileUrl?.trim() || lesson.file?.url;
    const updatedFileDuration =
      fileDuration?.trim() ?? lesson.file?.duration ?? "";

    if (!updatedFileType || !["pptx", "video"].includes(updatedFileType)) {
      throw new ApiError(
        400,
        "Valid file type is required. Use pptx or video.",
      );
    }

    if (!updatedFileName) {
      throw new ApiError(400, "File name is required.");
    }

    if (!updatedFileUrl) {
      throw new ApiError(400, "File URL is required.");
    }

    lesson.file = {
      type: updatedFileType,
      name: updatedFileName,
      url: updatedFileUrl,
      duration: updatedFileDuration,
    };
  }

  if (req.file) {
    const oldThumbnailPublicId = lesson.thumbnail?.publicId;

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

    if (oldThumbnailPublicId) {
      try {
        await deleteFromCloudinary(oldThumbnailPublicId);
      } catch (error) {
        console.log("Old thumbnail delete failed:", error);
      }
    }
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
      console.log("Thumbnail delete failed:", error);
    }
  }

  await lesson.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Lesson deleted successfully."));
});

const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({})
    .populate("topic", "title description grade thumbnail")
    .select(
      "topic title description thumbnail file order isPublished isFeatured createdAt updatedAt",
    )
    .sort({
      topic: 1,
      order: 1,
    })
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, lessons, "Lessons fetched successfully."));
});

const getFeaturedLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({
    isPublished: true,
    isFeatured: true,
  })
    .populate("topic", "title grade")
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, lessons, "Featured lessons fetched successfully"),
    );
});

const toggleFeaturedLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }

  if (!lesson.isPublished) {
    throw new ApiError(400, "Only published lessons can be featured");
  }

  if (!lesson.isFeatured) {
    const featuredCount = await Lesson.countDocuments({
      isFeatured: true,
      isPublished: true,
    });

    if (featuredCount >= 6) {
      throw new ApiError(400, "You can have a maximum of 6 featured lessons.");
    }
  }

  lesson.isFeatured = !lesson.isFeatured;

  await lesson.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        lesson,
        lesson.isFeatured
          ? "Lesson added to featured lessons"
          : "Lesson removed from featured",
      ),
    );
});

export {
  createLesson,
  getLessonsByTopic,
  getLessonById,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getFeaturedLessons,
  toggleFeaturedLesson,
};
