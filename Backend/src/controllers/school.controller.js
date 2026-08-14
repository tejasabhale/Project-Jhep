import School from "../models/school.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSchool = asyncHandler(async (req, res) => {
  const { name, location, image, isActive, order } = req.body;

  if (!name || !location) {
    throw new ApiError(400, "Name and location are required");
  }

  const school = await School.create({
    name,
    location,
    image,
    isActive: isActive ?? true,
    order: order ?? 0,
    createdBy: req.user?._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, school, "School created successfully"));
});

const getAllSchools = asyncHandler(async (req, res) => {
  const schools = await School.find({
    isActive: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .select("-createdBy -__v");

  return res
    .status(200)
    .json(new ApiResponse(200, schools, "Active schools fetched successfully"));
});

const getAllSchoolsForAdmin = asyncHandler(async (req, res) => {
  const schools = await School.find()
    .sort({
      isActive: -1,
      order: 1,
      createdAt: -1,
    })
    .select("-__v");

  return res
    .status(200)
    .json(new ApiResponse(200, schools, "All schools fetched successfully"));
});

const getSchoolById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const school = await School.findById(id).select("-createdBy -__v");

  if (!school) {
    throw new ApiError(404, "School not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, school, "School fetched successfully"));
});

const updateSchool = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const allowedFields = ["name", "location", "image", "isActive", "order"];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid fields provided for update");
  }

  const school = await School.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  }).select("-__v");

  if (!school) {
    throw new ApiError(404, "School not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, school, "School updated successfully"));
});

const deleteSchool = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const school = await School.findByIdAndDelete(id);

  if (!school) {
    throw new ApiError(404, "School not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "School deleted successfully"));
});

const toggleSchoolStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const school = await School.findById(id);

  if (!school) {
    throw new ApiError(404, "School not found");
  }

  school.isActive = !school.isActive;

  await school.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        school,
        `School ${school.isActive ? "activated" : "deactivated"} successfully`,
      ),
    );
});

export {
  createSchool,
  getAllSchools,
  getAllSchoolsForAdmin,
  getSchoolById,
  updateSchool,
  deleteSchool,
  toggleSchoolStatus,
};
