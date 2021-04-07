const User = require("./User");
const Message = require("./Message");

const conversation = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    user1: DataTypes.INTEGER,
    user2: DataTypes.INTEGER,
  });

  Conversation.hasMany(Message, { foreignKey: "conversationId" });
  Conversation.belongsToMany(User, { through: UserConversations });

  return Conversation;
};

module.exports = conversation;
