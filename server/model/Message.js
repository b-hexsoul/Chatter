const message = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    userId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    conversationId: DataTypes.INTEGER,
  });

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
    Message.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Message;
};

module.exports = message;
