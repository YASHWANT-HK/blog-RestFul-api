const express = require("express");
const router = express.Router();  //creating sub router
const { authcontroller } = require("../controllers");
const { signupValidator  } = require("../validators/auth")

router.post("/signup", signupValidator, validate, authcontroller.signup );

module.exports = router;