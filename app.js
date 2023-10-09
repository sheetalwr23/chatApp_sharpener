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
const { emit, disconnect } = require("process");
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
app.use("/", chatRoute);
app.use("/", groupRoute);

// io.on("connection", (socket) => {
//   console.log("a user connected", socket);

//   // socket.on('join-group', (groupId) => {
//   //     socket.join(groupId);
//   // });

//   socket.on("new-message", (messageData) => {
//     io.to(messageData.groupId).emit("receive-message", messageData); //broadcast the message to all users in the group
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// server.listen(3000, () => {
//   console.log("listening on *:3000");
// });
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
    console.log("Table created");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

const server = app.listen(2000, () => {
  console.log("listening to port 2000");
});

const { Server } = require("socket.io");
const {
  saveSocketId,
  socketDisconnect,
  sendMessage,
} = require("./controller/socket");
const SocketUser = require("./models/socket_user");
const io = new Server(server);
// var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  const socket_id = socket.id;
  //sending message for first connection
  console.log("someone is connected : - ", socket_id);
  io.to(socket.id).emit("connection", socket_id);

  socket.on("save-customer-details", saveSocketId);

  socket.on("disconnect", async (socketId) => {
    await SocketUser.destroy({ where: { socket_id } });
  });

  socket.on("sendMessage", (messageData) => {
    sendMessage(messageData, io);
  });
});
