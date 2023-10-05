const Chatapp = require("../models/chatapp");
const sequelize = require("sequelize");
const createMsg = async (req, res) => {
  try {
    console.log("hello", req.body);
    const { msg } = req.body;
    console.log("msg from you", msg);
    const chatMsg = await Chatapp.create({ msg: msg, userId: req.user.id });
    return res.status(200).json({ chatMsg: chatMsg });
  } catch {
    return res.status(500).json({ message: "cant send msg into db" });
  }
};

const getMsg = async (req, res) => {
  try {
    const data = await Chatapp.findAll({ where: { userId: req.user.id } });
    console.log("getdata>>>>>>>>>>", data);
    return res
      .status(200)
      .json({ chatMsg: data, message: " data fetched successfully" });
  } catch (err) {
    console.log("something went wrong", err);
  }
};
module.exports = { createMsg, getMsg };
