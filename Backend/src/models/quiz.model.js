import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required."],
      trim: true,
      maxlength: 500,
    },

    options: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: 250,
        },
      ],
      required: [true, "Options are required."],
      validate: {
        validator: (options) => options.length === 4,
        message: "Each question must have exactly 4 options.",
      },
    },

    correctOption: {
      type: Number,
      required: [true, "Correct option is required."],
      min: 0,
      max: 3,
    },

    explanation: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { _id: true },
);

const quizSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Lesson is required."],
    },

    title: {
      type: String,
      required: [true, "Quiz title is required."],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    questions: {
      type: [quizQuestionSchema],
      required: true,
      validate: {
        validator: (questions) =>
          Array.isArray(questions) &&
          questions.length >= 1 &&
          questions.length <= 50,
        message: "Quiz must contain between 1 and 50 questions.",
      },
    },

    passingScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 40,
    },

    durationMinutes: {
      type: Number,
      min: 1,
      max: 180,
      default: 15,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Quiz creator is required."],
    },
  },
  {
    timestamps: true,
  },
);

quizSchema.index({ lesson: 1 }, { unique: true });
quizSchema.index({ isPublished: 1 });

export default mongoose.model("Quiz", quizSchema);
