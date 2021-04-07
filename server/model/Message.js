const User = require("./User");
const Conversation = require("./Conversation");

const message = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    sender: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    conversationId: DataTypes.INTEGER,
  });

  Message.belongsTo(User);
  Message.belongsTo(Conversation);

  return Message;
};

module.exports = message;
