const express = require("express");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const UserRouter = require("./routes/userRoutes");
const ViewRouter = require("./routes/viewRoutes");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/", ViewRouter);
app.use("/api/v1/users", UserRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
