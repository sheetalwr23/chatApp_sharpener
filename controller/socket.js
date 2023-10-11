const ChatMsg = require("../models/chatapp");
const SocketUser = require("../models/socket_user");

const saveSocketId = async ({ userId, socket_id }) => {
  await SocketUser.create({
    socket_id,
    userId,
  });
};

const sendMessage = async (messageData, io) => {
  const { to } = messageData;
  console.log("check sending message : - ", messageData);
  const sendingSocketDetails = await SocketUser.findOne({
    where: { userId: to },

    order: [["id", "desc"]],
  });
  io.to(sendingSocketDetails?.socket_id).emit("received_msg", messageData);
  await ChatMsg.create(messageData);
};
module.exports = { saveSocketId, sendMessage };
