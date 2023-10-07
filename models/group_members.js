const Sequelize = require("sequelize");
const sequelize = require("../util/chatapp");

const group_members = sequelize.define("groupMembers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  groupId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = group_members;
