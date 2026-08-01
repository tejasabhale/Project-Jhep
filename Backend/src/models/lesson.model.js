import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
      maxlength: 150,
    },

    thumbnail: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

lessonSchema.index({ topic: 1, title: 1 }, { unique: true });

lessonSchema.index({ topic: 1, order: 1 }, { unique: true });

export default mongoose.model("Lesson", lessonSchema);
