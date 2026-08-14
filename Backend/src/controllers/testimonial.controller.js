import Testimonial from "../models/testimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTestimonial = asyncHandler(async (req, res) => {
  const { name, grade, review, rating, image, isActive, order } = req.body;

  if (!name || !grade || !review) {
    throw new ApiError(400, "Name, grade and review are required");
  }

  const testimonial = await Testimonial.create({
    name,
    grade,
    review,
    rating: rating ?? 5,
    image: image || "",
    isActive: isActive ?? true,
    order: order ?? 0,
    createdBy: req.user?._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, testimonial, "Testimonial created successfully"),
    );
});

const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({
    isActive: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .select("-createdBy -__v");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        testimonials,
        "Active testimonials fetched successfully",
      ),
    );
});

const getAllTestimonialsForAdmin = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find()
    .sort({
      isActive: -1,
      order: 1,
      createdAt: -1,
    })
    .select("-__v");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        testimonials,
        "All testimonials fetched successfully",
      ),
    );
});

const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id).select("-createdBy -__v");

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, testimonial, "Testimonial fetched successfully"),
    );
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const allowedFields = [
    "name",
    "grade",
    "review",
    "rating",
    "image",
    "isActive",
    "order",
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid fields provided for update");
  }

  const testimonial = await Testimonial.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  }).select("-__v");

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, testimonial, "Testimonial updated successfully"),
    );
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndDelete(id);

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Testimonial deleted successfully"));
});

const toggleTestimonialStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  testimonial.isActive = !testimonial.isActive;

  await testimonial.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        testimonial,
        `Testimonial ${
          testimonial.isActive ? "activated" : "deactivated"
        } successfully`,
      ),
    );
});

export {
  createTestimonial,
  getAllTestimonials,
  getAllTestimonialsForAdmin,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
};
