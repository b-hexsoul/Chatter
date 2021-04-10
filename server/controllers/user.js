const db = require("../model");
const { Op } = require("sequelize");

// @desc    Get a user. Search by username
// @route   GET /api/user/?search
// @access  Public
exports.getUserSearch = async (req, res) => {
  let query = req.query.search;

  try {
    // search for username like searchtext
    console.log(query);

    let users = await db.User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    // clean up users to return only usernames
    users = users.map((user) => user.dataValues.username);

    if (!users)
      return res.status(400).json({ success: false, msg: "Users not found" });

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
