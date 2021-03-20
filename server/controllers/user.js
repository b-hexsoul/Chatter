const db = require("../model");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
require("dotenv").config();

const { JWT_SECRET, JWT_EXPIRES } = process.env;

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
      secure: true,
    });

    // End Response
    res.status(201).send({
      message: "You signed up!",
      token: token,
      user: { id, username },
    });
    res.status(201).send({ message: "You signed up!" });
  } catch (error) {
    res.status(400).send({ message: "There was an error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Search for email in User Table
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    // Check password against hashed password
    let isValidPw = await user.validPassword(password);

    if (!isValidPw) {
      return res.status(400).send({ message: "Invalid Password" });
    } else {
      let { id, username } = user.dataValues;

      // Create JWT
      let token = jsonwebtoken.sign({ id: id, username: username }, JWT_SECRET);

      // Set httpOnly cookie with JWT
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: true,
      });
      res
        .status(201)
        .send({ message: "You are logged in!", user: { id, username } });
    }
  } catch (error) {
    console.error("there was an error", error);
    res.status(400).send({ message: "There was an error", error });
  }
};
