const express = require("express")
const router = express.Router()


const { signin, signup, sendOtpController, verifyOTP } = require("../controllers/auth.controller");
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOTP);


export default router;