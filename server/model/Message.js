const message = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    sender: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    conversationId: DataTypes.INTEGER,
  });

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation);
    Message.belongsTo(models.User, { foreignKey: "sender" });
  };

  return Message;
};

module.exports = message;
