import Quiz from "../models/Quiz.js";

export const getQuizzesByTopic = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ topic: req.params.topicId });

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};
