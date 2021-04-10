const conversation = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {});

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.User, {
      through: {
        model: models.UserConversation,
      },
    });

    Conversation.hasMany(models.Message, {
      foreignKey: "conversationId",
    });
  };

  return Conversation;
};

module.exports = conversation;
