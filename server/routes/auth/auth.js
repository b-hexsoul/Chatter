const express = require("express");
const AuthRouter = express.Router();
const isAuthenticated = require("../../middleware/isAuthenticated");
const {
  register,
  login,
  logout,
  authenticate,
} = require("../../controllers/auth");

// Route of /auth
AuthRouter.route("/register").post(register);

AuthRouter.route("/login").post(login);

AuthRouter.route("/logout").post(logout);

AuthRouter.route("/authenticate").get(isAuthenticated, authenticate);

module.exports = AuthRouter;
