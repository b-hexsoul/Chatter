const express = require("express");
const { getAllUserConversations } = require("../controllers/conversation");
const router = express.Router();

// Route of /api/conversation
router.route("/").get(getAllUserConversations);

module.exports = router;
