const express = require("express");
const router = express.Router();
const controller = require("../controller/user");
const path = require("path");

router.use(express.static(path.join(__dirname, "public")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.post("/signup", controller.createSignupController);
router.post("/login", controller.createloginController);
router.get("/user", controller.getLoginUsers);
router.put("/updateStatus/:id", controller.updateStatus);

module.exports = router;
