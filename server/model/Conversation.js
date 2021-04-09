const conversation = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    user1: DataTypes.INTEGER,
    user2: DataTypes.INTEGER,
  });

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.User, {
      through: {
        model: models.UserConversation,
      },
    });
  };

  return Conversation;
};

module.exports = conversation;
