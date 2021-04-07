const Conversation = require("./Conversation");
const Message = require("./Message");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatarImg: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Not a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Add method to check if password is valid (users hashed pw)
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // Hashing user password with bcrypt before creation
  // Note: You can't use hooks with instances. Hooks are used with models.
  User.addHook("beforeCreate", async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  });

  User.belongsToMany(Conversation, { through: "UserConversation" });
  User.hasMany(Message, { foreignKey: "sender" });

  return User;
};

module.exports = user;
