const express = require("express");
const { getAllMessages } = require("../controllers/message");
const router = express.Router();

// Route of /api/messages
router.route("/").get(getAllMessages);

module.exports = router;
