const express = require("express");
const router = express.Router();  //creating sub router
const { authcontroller } = require("../controllers");
const { signupValidator, verifyUserValidator, emailValidator, recoverPasswordValidator  } = require("../validators/auth");
const validate = require("../validators/validate");

router.post("/signup", signupValidator, validate, authcontroller.signup );
router.post("/send-verification-email",emailValidator, validate, authcontroller.verifyCode);
router.post("/verify-user", verifyUserValidator, validate, authcontroller.verifyUser);
router.post("/forgot-password-code", emailValidator, validate, authcontroller.forgotPasswordCode);
router.post("/recover-password", recoverPasswordValidator, validate, authcontroller.recoverPassword);

module.exports = router;