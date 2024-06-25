const { check } = require("express-validator");
const validateEmail = require("./validateEmail");
const { mongoose } = require("mongoose");

const signupValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name is required"),

    check("email")
        .isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required"), 
    check("password")
        .isLength({min: 6})
        .withMessage("Password must be 6 charecter long")
        .notEmpty()
        .withMessage("Password is required"),
    check("company")
        .notEmpty()
        .withMessage("Company name is required")
];

const emailValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),
];

const verifyUserValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),
    
    check("code").notEmpty().withMessage("Code is required"),
];

const recoverPasswordValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),

    check("code").notEmpty().withMessage("Code is required"),
    
    check("password")
        .isLength({min: 6})
        .withMessage("Password must be 6 charecter long")
        .notEmpty()
        .withMessage("Password is required"),  
]

module.exports = { 
    signupValidator, 
    verifyUserValidator,
    emailValidator,
    recoverPasswordValidator,
};