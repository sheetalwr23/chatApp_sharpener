const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const path = require("path");

router.use(express.static(path.join(__dirname, "views")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.post("/signUp", userController.createUser);

module.exports = router;
