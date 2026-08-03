import Team from "../models/team.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const createTeamMember = asyncHandler(async (req, res) => {
  const {
    name,
    role,
    description,
    github,
    linkedin,
    twitter,
    email,
    order,
    isActive,
  } = req.body;

  if (!name?.trim()) {
    throw new ApiError(400, "Name is required.");
  }

  if (!role?.trim()) {
    throw new ApiError(400, "Role is required.");
  }

  if (!req.file) {
    throw new ApiError(400, "Profile photo is required.");
  }

  const existingMember = await Team.findOne({
    name: {
      $regex: new RegExp(`^${name.trim()}$`, "i"),
    },
  });

  if (existingMember) {
    throw new ApiError(409, "Team member already exists.");
  }

  const uploaded = await uploadOnCloudinary(
    req.file.path,
    "image",
    "team-members",
  );

  if (!uploaded?.secure_url) {
    throw new ApiError(500, "Failed to upload profile photo.");
  }

  const member = await Team.create({
    photo: {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    },

    name: name.trim(),
    role: role.trim(),
    description: description?.trim() || "",

    github: github?.trim() || "",
    linkedin: linkedin?.trim() || "",
    twitter: twitter?.trim() || "",
    email: email?.trim() || "",

    order: Number(order) || 0,
    isActive: isActive === "false" ? false : true,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Team member created successfully."));
});

export const getAllTeamMembers = asyncHandler(async (req, res) => {
  const members = await Team.find({
    isActive: true,
  })
    .sort({
      order: 1,
      createdAt: 1,
    })
    .select("-__v")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Team members fetched successfully."));
});

export const getAllTeamMembersAdmin = asyncHandler(async (req, res) => {
  const members = await Team.find()
    .sort({
      order: 1,
      createdAt: 1,
    })
    .select("-__v")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Team members fetched successfully."));
});

export const getTeamMemberById = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const member = await Team.findById(teamId).select("-__v").lean();

  if (!member) {
    throw new ApiError(404, "Team member not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, member, "Team member fetched successfully."));
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const member = await Team.findById(teamId);

  if (!member) {
    throw new ApiError(404, "Team member not found.");
  }

  let {
    name,
    role,
    description,
    github,
    linkedin,
    twitter,
    email,
    order,
    isActive,
  } = req.body;

  name = name?.trim();
  role = role?.trim();
  description = description?.trim();

  if (name) {
    const existingMember = await Team.findOne({
      _id: {
        $ne: teamId,
      },
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    });

    if (existingMember) {
      throw new ApiError(409, "Another member already has this name.");
    }

    member.name = name;
  }

  if (role) {
    member.role = role;
  }

  if (description !== undefined) {
    member.description = description;
  }

  if (github !== undefined) {
    member.github = github.trim();
  }

  if (linkedin !== undefined) {
    member.linkedin = linkedin.trim();
  }

  if (twitter !== undefined) {
    member.twitter = twitter.trim();
  }

  if (email !== undefined) {
    member.email = email.trim();
  }

  if (order !== undefined) {
    member.order = Number(order);
  }

  if (typeof isActive !== "undefined") {
    member.isActive = isActive === "true";
  }

  if (req.file) {
    const uploaded = await uploadOnCloudinary(
      req.file.path,
      "image",
      "team-members",
    );

    if (!uploaded?.secure_url) {
      throw new ApiError(500, "Failed to upload profile photo.");
    }

    if (member.photo?.publicId) {
      try {
        await deleteFromCloudinary(member.photo.publicId);
      } catch (error) {
        console.error("Cloudinary delete failed:", error);
      }
    }

    member.photo = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  await member.save();

  return res
    .status(200)
    .json(new ApiResponse(200, member, "Team member updated successfully."));
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const member = await Team.findById(teamId);

  if (!member) {
    throw new ApiError(404, "Team member not found.");
  }

  if (member.photo?.publicId) {
    try {
      await deleteFromCloudinary(member.photo.publicId);
    } catch (error) {
      console.error("Failed to delete Cloudinary image:", error);
    }
  }

  await member.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Team member deleted successfully."));
});
