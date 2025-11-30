import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import Quiz from "../models/Quiz.js";
import Topic from "../models/Topic.js";

const MONGO_URI = process.env.MONGO_URI;

async function seedQuiz() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const cvTopic = await Topic.findOne({ name: "Cardiovascular" });

    if (!cvTopic) {
      console.log("❌ Topic not found. Make sure topics are seeded.");
      process.exit(1);
    }

    const quizzes = [
      {
        topic: cvTopic._id,
        question: "Which finding indicates LEFT-sided heart failure?",
        options: [
          "Peripheral edema",
          "Crackles in lungs",
          "Jugular vein distention",
          "Warm flushed skin",
        ],
        correctIndex: 1,
      },
      {
        topic: cvTopic._id,
        question: "Priority intervention for chest pain?",
        options: ["Aspirin", "Morphine", "Nitroglycerin", "Oxygen"],
        correctIndex: 3, // oxygen first
      },
    ];

    await Quiz.deleteMany({});
    await Quiz.insertMany(quizzes);

    console.log("🎉 Quizzes seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedQuiz();
