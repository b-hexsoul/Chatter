const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    // Validate JWT
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Bad Token" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ success: false, message: "You are not logged in" });
  }
};
