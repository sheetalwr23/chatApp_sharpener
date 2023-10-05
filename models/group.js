const Sequelize = require("sequelize");
const sequelize_db = require("../util/chatapp");

const Group = sequelize_db.define("group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  groupname: {
    type: Sequelize.STRING,
  },
  createdBy: {
    type: Sequelize.STRING,
  },
});
module.exports = Group;
