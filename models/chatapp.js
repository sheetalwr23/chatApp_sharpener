const Sequelize = require("sequelize");
const sequelize_db = require("../util/chatapp");

const ChatMsg = sequelize_db.define("chatapp", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  msg: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = ChatMsg;
