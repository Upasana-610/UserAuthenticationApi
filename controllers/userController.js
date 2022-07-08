const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const jwt = require("jsonwebtoken");

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data

  const user = await User.findById(req.params.id);

  if (
    !req.body.password ||
    !req.body.passwordConfirm ||
    !req.body.name ||
    !req.body.email
  ) {
    return next(
      new AppError(
        "Please enter all the fields: name, email, password, passwordConfirm",
        404
      )
    );
  }

  // 3) If so, update password

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.name = req.body.name;
  user.email = req.body.email;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  console.log(token);

  res.cookie("jwt", token, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.id);

  const doc = await query;

  if (!doc) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// Do NOT update passwords with this!
exports.deleteUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
