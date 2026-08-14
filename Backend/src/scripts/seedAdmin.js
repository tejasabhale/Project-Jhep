import '../config/env.js'
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const ownerExists = await User.findOne({
      role: "admin",
    });

    if (ownerExists) {
      console.log("Owner already exists.");
      process.exit();
    }

    const owner = await User.create({
      fullName: process.env.ADMIN_NAME,
      userName: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      mobileNo: process.env.ADMIN_MOBILE_NO,
      role: "admin",
    });

    console.log("Owner Created");
    console.log(owner);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin()
