const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const exController = require("../controller/chatapp");
const path = require("path");
const jwt = require("jsonwebtoken");
const userAuthentication = require("../middleware/auth");

router.use(express.static(path.join(__dirname, "public")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.post("/signup", controller.createSignupController);
router.post("/login", controller.createloginController);
router.put("/updateStatus/:id", controller.updateStatus);

router.get("/user", controller.getLoginUsers);

module.exports = router;
