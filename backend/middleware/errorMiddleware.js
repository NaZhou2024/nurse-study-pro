export function errorHandler(err, req, res, next) {
  console.error("🔥 ERROR:", err);

  const status = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(status).json({
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}
