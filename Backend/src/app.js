import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import topicRouter from "./routes/topic.routes.js";
import lessonRouter from "./routes/lesson.routes.js";
import adminRouter from "./routes/admin.routes.js";
import teamRouter from "./routes/team.routes.js";
import userRouter from "./routes/user.routes.js";
import schoolRoutes from "./routes/school.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";

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
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/topics", topicRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/testimonials", testimonialRouter);

// Error Handler
app.use(errorHandler);

export { app };
