import mongoose from "mongoose";
import dotenv from "dotenv";
import Topic from "../models/Topic.js"; // adjust path if needed

dotenv.config({ path: "./.env" }); // <-- VERY IMPORTANT

async function seedTopics() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB");

    const topics = [
      { number: "01", name: "Cardiovascular" },
      { number: "02", name: "Respiratory" },
      { number: "03", name: "Neurological" },
      // ... add all your categories
    ];

    await Topic.deleteMany();
    await Topic.insertMany(topics);

    console.log("🌱 Topics seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedTopics();
