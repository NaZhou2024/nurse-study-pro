import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: String,
  description: String,
  notes: String,
  videos: [String],
  visuals: [String],
});

export default mongoose.model("Topic", topicSchema);
