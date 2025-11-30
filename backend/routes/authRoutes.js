import express from "express";
import { loginUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/login", loginUser);

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

export default router;
