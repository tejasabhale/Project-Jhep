import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    loginAt: {
      type: Date,
      required: true,
    },

    logoutAt: {
      type: Date,
    },

    lastActiveAt: {
      type: Date,
      required: true,
    },

    totalActiveSeconds: {
      type: Number,
      default: 0,
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Activity = mongoose.model("Activity", activitySchema);
