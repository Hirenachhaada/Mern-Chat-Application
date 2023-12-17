const express = require("express");
const router = express.Router();
const {
  registerUser,
  updatePassword,
  forgotPassoword,
  postResetPassword,
  verifyEmail,
} = require("../controllers/userControllers");
const { authUser } = require("../controllers/userControllers");
const { allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const { updateUser } = require("../controllers/userControllers");
router.route("/").post(registerUser); // both are differnt ways to write the same thing
router.post("/login", authUser);
router.route("/").get(protect, allUsers);
router.route("/:userId").put(protect, updateUser);
router.route("/:userId/updatepassword").put(protect, updatePassword);
router.route("/forgot-password").post(forgotPassoword);
router.route("/:userId/:token/postResetPassword").post(postResetPassword);
router.route("/verify/:token").get(verifyEmail);
module.exports = router;
