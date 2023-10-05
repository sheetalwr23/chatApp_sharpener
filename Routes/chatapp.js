const controller = require("../controller/chatapp");
const express = require("express");
const router = express.Router();
const path = require("path");
const userAuthentication = require("../middleware/auth");
router.use(express.static(path.join(__dirname, "public")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.post("/chat", userAuthentication.authenticate, controller.createMsg);
router.get("/chat", userAuthentication.authenticate, controller.getMsg);

module.exports = router;
