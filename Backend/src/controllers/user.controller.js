import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === "admin") {
    query.createdBy = req.user._id;
  }

  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully."));
});

export const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, mobileNo, userName, password, role } = req.body;

  if (!fullName || !email || !mobileNo || !userName || !password || !role) {
    throw new ApiError(400, "All fields are required.");
  }

  const normalizedFullName = fullName.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedMobileNo = mobileNo.trim();
  const normalizedUserName = userName.trim().toLowerCase();

  let allowedRoles = [];

  if (req.user.role === "owner") {
    allowedRoles = ["admin", "user"];
  } else if (req.user.role === "admin") {
    allowedRoles = ["user"];
  } else {
    throw new ApiError(403, "Access denied.");
  }

  if (!allowedRoles.includes(role)) {
    throw new ApiError(403, "You are not allowed to create this role.");
  }

  const existingUser = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { userName: normalizedUserName },
      { mobileNo: normalizedMobileNo },
    ],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email, username, or mobile number already exists.",
    );
  }

  const user = await User.create({
    fullName: normalizedFullName,
    email: normalizedEmail,
    mobileNo: normalizedMobileNo,
    userName: normalizedUserName,
    password,
    role,
    createdBy: req.user._id,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully."));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { fullName, email, mobileNo, userName, role } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.role === "owner") {
    throw new ApiError(403, "Owner account cannot be modified.");
  }

  if (!["owner", "admin"].includes(req.user.role)) {
    throw new ApiError(403, "Access denied.");
  }

  if (req.user.role === "admin") {
    if (!user.createdBy || !user.createdBy.equals(req.user._id)) {
      throw new ApiError(403, "You can only update users created by you.");
    }
  }

  if (fullName !== undefined) {
    const value = fullName.trim();

    if (!value) {
      throw new ApiError(400, "Full name cannot be empty.");
    }

    user.fullName = value;
  }

  if (email !== undefined) {
    const value = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: value,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new ApiError(409, "Email already exists.");
    }

    user.email = value;
  }

  if (mobileNo !== undefined) {
    const value = mobileNo.trim();

    const existingUser = await User.findOne({
      mobileNo: value,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new ApiError(409, "Mobile number already exists.");
    }

    user.mobileNo = value;
  }

  if (userName !== undefined) {
    const value = userName.trim().toLowerCase();

    const existingUser = await User.findOne({
      userName: value,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new ApiError(409, "Username already exists.");
    }

    user.userName = value;
  }

  if (role !== undefined) {
    let allowedRoles = [];

    if (req.user.role === "owner") {
      allowedRoles = ["admin", "user"];
    } else {
      allowedRoles = ["user"];
    }

    if (!allowedRoles.includes(role)) {
      throw new ApiError(403, "You are not allowed to assign this role.");
    }

    user.role = role;
  }

  await user.save();

  const updatedUser = await User.findById(userId).select(
    "-password -refreshToken",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully."));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.role === "owner") {
    throw new ApiError(403, "Owner account cannot be deleted.");
  }

  if (!["owner", "admin"].includes(req.user.role)) {
    throw new ApiError(403, "Access denied.");
  }

  if (req.user.role === "admin") {
    if (!user.createdBy || !user.createdBy.equals(req.user._id)) {
      throw new ApiError(403, "You can only delete users created by you.");
    }
  }

  await user.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully."));
});
