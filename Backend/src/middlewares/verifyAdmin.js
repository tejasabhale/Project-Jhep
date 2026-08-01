import { ApiError } from "../utils/ApiError.js";

const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Admin access only"));
  }

  next();
};

export default verifyAdmin;
