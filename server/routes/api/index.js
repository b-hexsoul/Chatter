const express = require("express");
const ApiRouter = express.Router();

ApiRouter.use("/user", require("./user"));
ApiRouter.use("/conversations", require("./conversation"));

module.exports = ApiRouter;
