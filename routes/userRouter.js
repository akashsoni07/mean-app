const router = require("express").Router();
const { requireLogin } = require("../middlewares/requireLogin");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  editProfile,
} = require("../controllers/userController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.put("/change-password", requireLogin, changePassword);

router.post("/verify-email", verifyEmail);

router.put("/edit-profile", requireLogin, editProfile);

module.exports = router;
