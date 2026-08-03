import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    loginTime: {
      type: Date,
      default: Date.now,
    },

    logoutTime: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "offline"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
