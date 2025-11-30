import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Middleware to read the cookie token
const jwt = require("jsonwebtoken");

export default router; // <-- IMPORTANT

// AUTH middleware
function auth(req, res, next) {
  const token = req.cookies.token; // ⬅ read httpOnly cookie
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ⭐ NEW: Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // hide password
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to load user" });
  }
});

module.exports = router;

router.post("/register", registerUser);
router.post("/login", loginUser);
