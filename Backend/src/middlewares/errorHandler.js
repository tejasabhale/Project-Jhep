import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "File size should not exceed 5 MB."));
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");

    return res.status(400).json(new ApiResponse(400, null, message));
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res
      .status(409)
      .json(
        new ApiResponse(
          409,
          null,
          `${field} '${value}' already exists.`
        )
      );
  }

  // Custom ApiError
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  }

  // Unknown error
  console.error(err);

  return res
    .status(500)
    .json(new ApiResponse(500, null, "Internal Server Error"));
};