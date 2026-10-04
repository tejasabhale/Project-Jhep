import Quiz from "../models/quiz.model.js";
import Lesson from "../models/lesson.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sanitizePublicQuiz = (quiz) => {
  if (!quiz) {
    return null;
  }

  return {
    _id: quiz._id,
    lesson: quiz.lesson,
    title: quiz.title,
    description: quiz.description,

    questions: quiz.questions.map((question) => ({
      _id: question._id,
      question: question.question,
      options: question.options,
    })),

    passingScore: quiz.passingScore,
    durationMinutes: quiz.durationMinutes,
    isPublished: quiz.isPublished,
    createdAt: quiz.createdAt,
    updatedAt: quiz.updatedAt,
  };
};

const createQuiz = asyncHandler(async (req, res) => {
  const {
    lessonId,
    title,
    description,
    questions,
    passingScore,
    durationMinutes,
    isPublished,
  } = req.body;

  if (!lessonId) {
    throw new ApiError(400, "Lesson is required.");
  }

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    throw new ApiError(404, "Lesson not found.");
  }

  const existingQuiz = await Quiz.findOne({
    lesson: lessonId,
  });

  if (existingQuiz) {
    throw new ApiError(409, "A quiz already exists for this lesson.");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Quiz title is required.");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new ApiError(400, "Quiz must contain at least one question.");
  }

  if (questions.length > 50) {
    throw new ApiError(400, "Quiz cannot contain more than 50 questions.");
  }

  for (const [index, question] of questions.entries()) {
    if (!question.question?.trim()) {
      throw new ApiError(400, `Question ${index + 1} is required.`);
    }

    if (!Array.isArray(question.options) || question.options.length !== 4) {
      throw new ApiError(
        400,
        `Question ${index + 1} must have exactly 4 options.`,
      );
    }

    if (question.options.some((option) => !String(option ?? "").trim())) {
      throw new ApiError(
        400,
        `All options are required for question ${index + 1}.`,
      );
    }

    const correctOption = Number(question.correctOption);

    if (
      !Number.isInteger(correctOption) ||
      correctOption < 0 ||
      correctOption > 3
    ) {
      throw new ApiError(
        400,
        `Question ${index + 1} has an invalid correct option.`,
      );
    }
  }

  const quiz = await Quiz.create({
    lesson: lessonId,

    title: title.trim(),

    description: description?.trim() || "",

    questions: questions.map((question) => ({
      question: question.question.trim(),

      options: question.options.map((option) => String(option).trim()),

      correctOption: Number(question.correctOption),

      explanation: question.explanation?.trim() || "",
    })),

    passingScore: passingScore !== undefined ? Number(passingScore) : 40,

    durationMinutes:
      durationMinutes !== undefined ? Number(durationMinutes) : 15,

    isPublished: isPublished === true || isPublished === "true",

    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, quiz, "Quiz created successfully."));
});

const getQuizByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;

  const quiz = await Quiz.findOne({
    lesson: lessonId,
    isPublished: true,
  })
    .populate("lesson", "title")
    .lean();

  if (!quiz) {
    throw new ApiError(404, "Published quiz not found for this lesson.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        sanitizePublicQuiz(quiz),
        "Quiz fetched successfully.",
      ),
    );
});

const getQuizById = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findOne({
    _id: quizId,
    isPublished: true,
  })
    .populate("lesson", "title")
    .lean();

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        sanitizePublicQuiz(quiz),
        "Quiz fetched successfully.",
      ),
    );
});

const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  if (!Array.isArray(answers)) {
    throw new ApiError(400, "Answers must be an array.");
  }

  const quiz = await Quiz.findOne({
    _id: quizId,
    isPublished: true,
  })
    .populate("lesson", "title")
    .lean();

  if (!quiz) {
    throw new ApiError(404, "Published quiz not found.");
  }

  const questionIds = new Set(
    quiz.questions.map((question) => question._id.toString()),
  );

  const answerMap = new Map();

  for (const answer of answers) {
    const questionId = answer?.questionId?.toString();

    if (!questionId) {
      throw new ApiError(400, "Question ID is required for every answer.");
    }

    if (!questionIds.has(questionId)) {
      throw new ApiError(400, "Invalid question ID.");
    }

    if (answerMap.has(questionId)) {
      throw new ApiError(400, "Duplicate answer submitted for a question.");
    }

    let selectedOption = answer?.selectedOption;

    if (
      selectedOption === undefined ||
      selectedOption === null ||
      selectedOption === ""
    ) {
      selectedOption = null;
    } else {
      selectedOption = Number(selectedOption);

      if (
        !Number.isInteger(selectedOption) ||
        selectedOption < 0 ||
        selectedOption > 3
      ) {
        throw new ApiError(400, "Selected option must be between 0 and 3.");
      }
    }

    answerMap.set(questionId, selectedOption);
  }

  let correctAnswers = 0;
  let answeredQuestions = 0;

  const review = quiz.questions.map((question, index) => {
    const questionId = question._id.toString();

    const selectedOption = answerMap.has(questionId)
      ? answerMap.get(questionId)
      : null;

    const isAnswered = selectedOption !== null;

    const isCorrect = isAnswered && selectedOption === question.correctOption;

    if (isAnswered) {
      answeredQuestions += 1;
    }

    if (isCorrect) {
      correctAnswers += 1;
    }

    return {
      questionNumber: index + 1,

      questionId: question._id,

      question: question.question,

      options: question.options,

      selectedOption,

      selectedAnswer: isAnswered ? question.options[selectedOption] : null,

      correctOption: question.correctOption,

      correctAnswer: question.options[question.correctOption],

      isCorrect,

      explanation: question.explanation || "",
    };
  });

  const totalQuestions = quiz.questions.length;

  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const passed = score >= quiz.passingScore;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        quiz: {
          _id: quiz._id,
          title: quiz.title,
          lesson: quiz.lesson,
        },

        score,

        correctAnswers,

        answeredQuestions,

        totalQuestions,

        passingScore: quiz.passingScore,

        passed,

        review,
      },
      "Quiz submitted successfully.",
    ),
  );
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({})
    .populate("lesson", "title topic order")
    .populate("createdBy", "fullName userName email")
    .sort({
      createdAt: -1,
    });

  return res
    .status(200)
    .json(new ApiResponse(200, quizzes, "Quizzes fetched successfully."));
});

const getQuizByIdAdmin = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findById(quizId)
    .populate("lesson", "title topic order")
    .populate("createdBy", "fullName userName email");

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, quiz, "Quiz fetched successfully."));
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  const {
    lessonId,
    title,
    description,
    questions,
    passingScore,
    durationMinutes,
    isPublished,
  } = req.body;

  if (lessonId && lessonId.toString() !== quiz.lesson.toString()) {
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      throw new ApiError(404, "Lesson not found.");
    }

    const existingQuiz = await Quiz.findOne({
      lesson: lessonId,
      _id: {
        $ne: quizId,
      },
    });

    if (existingQuiz) {
      throw new ApiError(409, "A quiz already exists for this lesson.");
    }

    quiz.lesson = lessonId;
  }

  if (title !== undefined) {
    if (!title?.trim()) {
      throw new ApiError(400, "Quiz title is required.");
    }

    quiz.title = title.trim();
  }

  if (description !== undefined) {
    quiz.description = description?.trim() || "";
  }

  if (questions !== undefined) {
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new ApiError(400, "Quiz must contain at least one question.");
    }

    if (questions.length > 50) {
      throw new ApiError(400, "Quiz cannot contain more than 50 questions.");
    }

    for (const [index, question] of questions.entries()) {
      if (!question.question?.trim()) {
        throw new ApiError(400, `Question ${index + 1} is required.`);
      }

      if (!Array.isArray(question.options) || question.options.length !== 4) {
        throw new ApiError(
          400,
          `Question ${index + 1} must have exactly 4 options.`,
        );
      }

      if (question.options.some((option) => !String(option ?? "").trim())) {
        throw new ApiError(
          400,
          `All options are required for question ${index + 1}.`,
        );
      }

      const correctOption = Number(question.correctOption);

      if (
        !Number.isInteger(correctOption) ||
        correctOption < 0 ||
        correctOption > 3
      ) {
        throw new ApiError(
          400,
          `Question ${index + 1} has an invalid correct option.`,
        );
      }
    }

    quiz.questions = questions.map((question) => ({
      question: question.question.trim(),

      options: question.options.map((option) => String(option).trim()),

      correctOption: Number(question.correctOption),

      explanation: question.explanation?.trim() || "",
    }));
  }

  if (passingScore !== undefined) {
    const score = Number(passingScore);

    if (Number.isNaN(score) || score < 0 || score > 100) {
      throw new ApiError(400, "Passing score must be between 0 and 100.");
    }

    quiz.passingScore = score;
  }

  if (durationMinutes !== undefined) {
    const duration = Number(durationMinutes);

    if (Number.isNaN(duration) || duration < 1 || duration > 180) {
      throw new ApiError(400, "Duration must be between 1 and 180 minutes.");
    }

    quiz.durationMinutes = duration;
  }

  if (isPublished !== undefined) {
    quiz.isPublished = isPublished === true || isPublished === "true";
  }

  await quiz.save();

  return res
    .status(200)
    .json(new ApiResponse(200, quiz, "Quiz updated successfully."));
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new ApiError(404, "Quiz not found.");
  }

  await quiz.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Quiz deleted successfully."));
});

export {
  createQuiz,
  getQuizByLesson,
  getQuizById,
  submitQuiz,
  getAllQuizzes,
  getQuizByIdAdmin,
  updateQuiz,
  deleteQuiz,
};
