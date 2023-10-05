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
const getLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const getUsers = await User.findAll({ where: { email: email } });

    if (getUsers.length > 0) {
      const user = getUsers[0]; // Assuming you only want to check the first user if multiple are found

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ error: "Failed to login user" });
        }
        if (result) {
          // const token = generateToken(User[0].id);
          // return res.status(200).json({ token: token, message: "Valid login user" });
          return res.status(200).json({ message: "Valid login user" });
        } else {
          return res.status(401).json({ error: "Invalid login user" });
        }
      });
    } else {
      // No user found with the provided email
      return res.status(401).json({ error: "Invalid login user" });
    }
  } catch (err) {
    console.error("Error while logging in:", err);
    return res.status(500).json({ error: "Failed to login user" });
  }
};

module.exports = { createUser, getLoginUser };
