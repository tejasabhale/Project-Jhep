import { User } from "../models/user.model.js";
import UserActivity from "../models/userActivity.model.js";
import Topic from "../models/topic.model.js";
import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const [users, topics, lessons, quizzes, activeUsers] = await Promise.all([
      User.countDocuments(),

      Topic.countDocuments(),

      Lesson.countDocuments(),

      Quiz.countDocuments(),

      UserActivity.countDocuments({
        status: "active",
      }),
    ]);

    res.status(200).json({
      success: true,

      data: {
        users,

        topics,

        lessons,

        quizzes,

        activeUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getUserActivity = async (req, res) => {
  try {
    const activities = await UserActivity.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
