import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String, // stored hashed password
  completedQuizzes: [{ topicId: String, score: Number, date: Date }],
  bookmarks: [String],
});

// Hash raw password before save
userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;

  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});


// Add method to verify password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export default mongoose.model("User", userSchema);
