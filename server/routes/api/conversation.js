const express = require("express");
const {
  getAllUserConversations,
  getConversationMessages,
} = require("../../controllers/conversation");
const router = express.Router();

// Route of /api/conversation
router.route("/").get(getAllUserConversations);
router.route("/:conversationId").get(getConversationMessages);

module.exports = router;
