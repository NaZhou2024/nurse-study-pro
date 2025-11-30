import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      return next();
    }

    res.status(403);
    throw new Error("Not authorized, no token");
  } catch (error) {
    res.status(403);
    next(error);
  }
}
