const AppError = require("./../utils/appError");

const sendErrorDev = (err, req, res) => {
  // A) API
  // console.error("ERROR 💥", err);
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json(err.message);
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  if (err.name === "CastError") err.statusCode = 400;
  if (err.code === 11000) err.statusCode = 400;
  if (err.name === "ValidationError") err.statusCode = 400;
  if (err.name === "JsonWebTokenError") err.statusCode = 401;
  if (err.name === "TokenExpiredError") err.statusCode = 401;

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  sendErrorDev(err, req, res);
};
