const userConversation = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define("UserConversation", {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    ConversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Conversations",
        key: "id",
      },
    },
  });

  return UserConversation;
};

module.exports = userConversation;
