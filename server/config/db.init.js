const db = require("../model/index");
// create database "chatter_db"? figure out how to do this.

// Use sequelize.sync({ force: true }) to sync all models at once -
// Do not use in production.
db.sequelize.sync({ force: true });
