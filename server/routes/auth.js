const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  register,
  login,
  logout,
  authenticate,
} = require("../controllers/auth");

// Route of /auth
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/authenticate").get(isAuthenticated, authenticate);

module.exports = router;
