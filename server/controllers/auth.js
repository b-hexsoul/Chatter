const db = require("../model");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
require("dotenv").config();

const { JWT_SECRET, JWT_EXPIRES } = process.env;

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    // Create a new user
    const newUser = await db.User.create(req.body);
    let { id, username } = newUser.dataValues;

    // Create JWT
    let token = jsonwebtoken.sign({ id: id, username: username }, JWT_SECRET);

    // Set httpOnly cookie with JWT
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    // End Response
    res.status(201).json({ user: { id, username } });
  } catch (error) {
    // find which input caused error
    let input = error.errors[0].path;
    let message =
      input === "email" ? "This email is taken" : "This username is taken";

    res.status(400).json({ error: message });
  }
};

// @desc    Login an existing user
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Search for email in User Table
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    // If no user found with email return response to client
    if (!user) return res.status(400).json({ error: "Email not found" });

    // Check password against hashed password
    let isValidPw = await user.validPassword(password);

    if (!isValidPw) {
      return res.status(400).json({ error: "Invalid Password" });
    } else {
      let { id, username } = user.dataValues;

      // Create JWT
      let token = jsonwebtoken.sign({ id: id, username: username }, JWT_SECRET);

      // Set httpOnly cookie with JWT
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
      res.status(201).json({ user: { id, username } });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// @desc    Authenticate if token is valid return user
// @route   POST /auth/authenticate
// @access  Public
exports.authenticate = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

// @desc    Logout the user
// @route   POST /auth/logout
// @access  Public
exports.logout = (req, res, next) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "You are logged out!" });
};
