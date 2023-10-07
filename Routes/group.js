const controller = require("../controller/group");
const express = require("express");
const router = express.Router();
const path = require("path");
const userAuthentication = require("../middleware/auth");

router.use(express.static(path.join(__dirname, "public")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.post(
  "/createGroup",
  userAuthentication.authenticate,
  controller.createGroup
);
router.get(
  "/getGroup",
  userAuthentication.authenticate,
  controller.getGroupDetails
);

router.put(
  "/updateGroup/:id",
  userAuthentication.authenticate,
  controller.updateGroup
);
module.exports = router;
