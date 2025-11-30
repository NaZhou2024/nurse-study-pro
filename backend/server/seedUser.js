import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const hashedPassword = await bcrypt.hash("123456", 10);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const run = async () => {
  try {
    await User.create({
      name: "Test User",
      email: "test@example.com",
      passwordHash: "123456",
    });
    console.log("User created!");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
};

run();
