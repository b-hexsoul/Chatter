const authRouter = require("./auth/auth");
const apiRouter = require("./api");

module.exports = function (app) {
  app.use("/api", apiRouter);
  app.use("/auth", authRouter);
};
