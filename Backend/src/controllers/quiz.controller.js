import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Quiz
const createQuiz = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const { title, description, passingMarks, questions } = req.body;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  const existingQuiz = await Quiz.findOne({
    lesson: lessonId,
  });

  if (existingQuiz) {
    throw new ApiError(400, "Quiz already exists for this lesson.");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new ApiError(400, "Questions are required.");
  }

  const quiz = await Quiz.create({
    lesson: lessonId,

    title,

    description,

    passingMarks,

    questions,

    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, quiz, "Quiz created successfully."));
});

// Get Quiz By Lesson
const getQuizByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const quiz = await Quiz.findOne({
    lesson: lessonId,
  });

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  return res.json(new ApiResponse(200, quiz, "Quiz fetched successfully."));
});

// Update Quiz
const updateQuiz = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const { title, description, passingMarks, questions, isPublished } = req.body;

  const quiz = await Quiz.findOne({
    lesson: lessonId,
  });

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  quiz.title = title ?? quiz.title;

  quiz.description = description ?? quiz.description;

  quiz.passingMarks = passingMarks ?? quiz.passingMarks;

  quiz.questions = questions ?? quiz.questions;

  quiz.isPublished = isPublished ?? quiz.isPublished;

  await quiz.save();

  return res.json(new ApiResponse(200, quiz, "Quiz updated successfully."));
});

// Delete Quiz
const deleteQuiz = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const quiz = await Quiz.findOneAndDelete({
    lesson: lessonId,
  });

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  return res.json(new ApiResponse(200, {}, "Quiz deleted successfully."));
});

export { createQuiz, getQuizByLesson, updateQuiz, deleteQuiz };
