import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctIndex: { type: Number, required: true },
});

export default mongoose.model("Quiz", quizSchema);
