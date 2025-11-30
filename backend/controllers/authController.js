import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    // 2. Verify password (use passwordHash!)
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // 3. Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // 4. Send token + user
    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err); // <-- log real error
    res.status(500).json({ message: "Server error" });
  }
};
