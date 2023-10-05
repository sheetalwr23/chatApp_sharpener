const Sequelize = require("sequelize");
const sequelize_db = new Sequelize("chatapp", "root", "Sheetal@2311", {
  dialect: "mysql",
  host: "localhost",
});
sequelize_db
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("cant connect to database", err);
  });
module.exports = sequelize_db;
