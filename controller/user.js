const sequelize = require("sequelize");
const User = require("../model/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    console.log("user details", name, phone, email, password);
    let saltround = 10;
    bcrypt.hash(password, saltround, async (err, hash) => {
      const newUser = await User.create({
        name: name,
        phone: phone,
        email: email,
        password: hash,
      });
      console.log("these are user details", newUser);
      return res.status(200).json({ sign_up: newUser, message: "posted data" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
};
//jwt authorization
// const generateToken = (User) => {
//   const token = jwt.sign({ userId: User.id }, "your-secret-key");
//   return token;
// };

module.exports = { createUser };
