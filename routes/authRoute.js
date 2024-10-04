const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");

const {
  register,
  login,
  renewToken,
  sendPasswordResetEmail,
  sendVerificationEmail,
  verifyEmail,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/renewtoken", renewToken);
router.post("/getresetotp", sendPasswordResetEmail);
router.post("/getverifyotp", authenticateToken, sendVerificationEmail);
router.post("/verifyemail", authenticateToken, verifyEmail);

module.exports = router;
