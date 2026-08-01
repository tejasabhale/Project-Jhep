import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minlength: 3,
      maxlength: 30,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      index: true,
    },

    avatar: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      match: [/^\d{10}$/, "Please enter a valid 10 digit mobile number"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },

    // ===== Admin Approval =====

    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    blocked: {
      type: Boolean,
      default: false,
      index: true,
    },

    // ===== Authentication =====

    refreshToken: {
      type: String,
      select: false,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetTokenExpiry: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// Compound Indexes
userSchema.index({
  isApproved: 1,
  blocked: 1,
});

userSchema.index({
  role: 1,
  isApproved: 1,
});

// Virtual Status
userSchema.virtual("status").get(function () {
  if (this.blocked) return "Blocked";

  if (!this.isApproved) return "Pending";

  return "Approved";
});

// Include virtuals in JSON
userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.set("toObject", {
  virtuals: true,
});

// Hash Password
userSchema.pre("save", async function () {
  if (this.role === "admin") {
    this.isApproved = true;
  }

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
