const db = require("../model");

// @desc    Get all messages for a conversation.
// @route   GET /api/messages/
// @access  Public
exports.getAllMessages = async (req, res) => {
  let conversationId = req.body.conversationId;

  console.log(conversationId);
  try {
    let messages = await db.Message.findAll({
      raw: true,
      where: {
        conversationId: conversationId,
      },
      attributes: ["text", "createdAt"],
      include: [{ model: db.User, attributes: ["username"] }],
      order: [["createdAt", "ASC"]],
    });

    if (!messages) {
      return res.status(400).json({ success: false, msg: "No Messages" });
    }

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
};
