const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./Routes/user");
const path = require("path");
const cors = require("cors");

const sequelize_db = require("./util/chatapp");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "views")));
app.use("/", router);
app.use(cors());

const port = 2000;
sequelize_db
  .sync({ alter: true })
  .then(() => {
    app.listen(`${port}`);
    console.log(`listening to ${port} `);
    console.log("Table created");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });
