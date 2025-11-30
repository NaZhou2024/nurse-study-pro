import express from "express";
import { getQuizzesByTopic } from "../controllers/quizController.js";
import Quiz from "../models/Quiz.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Failed to get quizzes" });
  }
});

export default router;
