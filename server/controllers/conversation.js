const db = require("../model");
const { Op } = require("sequelize");
// @desc    Get all conversations for a user
// @route   GET /api/conversations/
// @access  Public
exports.getAllUserConversations = async (req, res) => {
  let userId = req.body.userId;

  try {
    let conversations = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: [],
      include: [
        {
          model: db.Conversation,
          attributes: ["id"],
          through: { attributes: [] },
          include: [
            {
              model: db.User,
              attributes: ["username"],
              through: { attributes: [] },
            },
            {
              model: db.Message,
              attributes: ["text"],
              separate: true,
              order: [["createdAt", "DESC"]],
              limit: 1,
            },
          ],
        },
      ],
    });

    if (!conversations) {
      return res.status(200).json({ success: true, data: [] });
    }

    return res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

// @desc    Get all messages for a conversation.
// @route   GET /api/conversations/{conversationId}
// @access  Public
exports.getConversationMessages = async (req, res) => {
  let { conversationId } = req.params;

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
      return res.status(200).json({ success: true, data: [] });
    }

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
