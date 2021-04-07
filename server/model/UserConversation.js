const User = require("./User");
const Conversation = require("./Conversation");

const userConversation = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define("UserConversation", {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    conversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: Conversation,
        key: "id",
      },
    },
  });

  return UserConversation;
};

module.exports = userConversation;
