import mongoose from "mongoose";

const lessonContentSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    blockType: {
      type: String,
      enum: ["ppt", "pdf", "video"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    file: {
      url: {
        type: String,
        required: true,
      },

      provider: {
        type: String,
        enum: ["google-drive", "youtube"],
        required: true,
      },

      fileName: {
        type: String,
        default: "",
      },

      resourceType: {
        type: String,
        enum: ["ppt", "pdf", "video"],
        required: true,
      },
    },

    order: {
      type: Number,
      required: true,
      min: 1,
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

export default mongoose.model("LessonContent", lessonContentSchema);
