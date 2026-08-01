import Lesson from "../models/lesson.model.js";
import LessonContent from "../models/lessonContent.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addQuiz = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const { questions } = req.body;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new ApiError(400, "Questions are required.");
  }

  const quiz = await LessonContent.create({
    lesson: lessonId,

    blockType: "quiz",

    title: "Quiz",

    order: 999,

    metadata: {
      questions,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, quiz, "Quiz created successfully."));
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const { questions } = req.body;

  const quiz = await LessonContent.findOne({
    lesson: lessonId,
    blockType: "quiz",
  });

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  quiz.metadata.questions = questions;

  await quiz.save();

  return res.json(new ApiResponse(200, quiz, "Quiz updated successfully."));
});

export { addQuiz, updateQuiz };
