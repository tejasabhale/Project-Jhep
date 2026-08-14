import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

export const validateObjectId = (fieldName, source = "params") => {
  return (req, res, next) => {
    const id = req[source]?.[fieldName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, `Invalid ${fieldName}`));
    }
    next();
  };
};
