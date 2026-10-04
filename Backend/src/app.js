import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import topicRoutes from "./routes/topic.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teamRoutes from "./routes/team.routes.js";
import userRoutes from "./routes/user.routes.js";
import schoolRoutes from "./routes/school.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import quizRoutes from "./routes/quiz.routes.js"

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Global Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/topics", topicRoutes);
app.use("/api/v1/lessons", lessonRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/quizzes", quizRoutes);

// Error Handler
app.use(errorHandler);

export { app };
