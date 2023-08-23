const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { sendMessage } = require("../controllers/messageControllers");
const { allMessages } = require("../controllers/messageControllers");
const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
