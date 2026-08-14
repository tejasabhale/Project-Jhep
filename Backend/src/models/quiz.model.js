import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (options) => options.length === 4,
        message: "Each question must have exactly 4 options.",
      },
    },

    answer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    points: {
      type: Number,
      default: 1,
      min: 1,
    },

    explanation: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const quizSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    passingMarks: {
      type: Number,
      default: 0,
      min: 0,
    },

    questions: {
      type: [questionSchema],
      required: true,

      validate: [
        {
          validator: (questions) => questions.length > 0,
          message: "Quiz must contain at least one question.",
        },

        {
          validator: (questions) => questions.length <= 50,
          message: "Quiz cannot contain more than 50 questions.",
        },
      ],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Quiz", quizSchema);
