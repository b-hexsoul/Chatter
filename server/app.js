const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const isAuthenticated = require("./middleware/isAuthenticated");
const { json, urlencoded } = express;

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// Routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const pingRouter = require("./routes/ping");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/ping", pingRouter);
app.use("/api/user", isAuthenticated, userRouter);
app.use("/api/messages", isAuthenticated, messageRouter);
app.use("/api/conversation", isAuthenticated, conversationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
