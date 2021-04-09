const userConversation = (sequelize) => {
  const UserConversation = sequelize.define("UserConversation");

  return UserConversation;
};

module.exports = userConversation;
