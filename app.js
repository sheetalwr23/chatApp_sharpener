const express = require("express");
const app = express();
const sequelize = require("sequelize");
const path = require("path");
const sequelize_db = require("./util/chatapp");
const user = require("./models/user");
const group_members = require("./models/group_members");
const group = require("./models/group");
const bodyParser = require("body-parser");
const router = require("./routes/user");
const chat = require("./models/chatapp");
const groupRoute = require("./routes/group");

const chatRoute = require("./routes/chatapp");

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
app.use("/", chatRoute);
app.use("/", groupRoute);

//one to many relation
user.hasMany(chat);
chat.belongsTo(user);

user.hasMany(group_members);
group_members.belongsTo(user);

group.hasMany(group_members);
group_members.belongsTo(group);

group.hasMany(chat);
chat.belongsTo(group);

sequelize_db
  .sync({ alter: true })
  .then(() => {
    app.listen(2000);
    console.log("listening to port 2000");
    console.log("Table created");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });
