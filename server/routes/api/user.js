const express = require("express");
const router = express.Router();
const { getUserSearch } = require("../../controllers/user");

// Route of /api/user
router.route("/").get(getUserSearch);

module.exports = router;
