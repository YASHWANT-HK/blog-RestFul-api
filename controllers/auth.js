const { User }  = require('../models');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require("../utils/comparePassword");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res, next ) => {
    try{
        const { name, email, password, role } = req.body;

        const isEmailExist = await User.findOne({ email });
        if(isEmailExist){
            res.code = 400;
            throw new Error("Email already exist");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({ name, email, password: hashedPassword, role});

        await newUser.save();
        
        res.status(201).json({ code: 201, status: true, message: "User registered successfully"});
    }catch(error){
        next(error);
    }
};

//email verification function with code - sending verification code through mail
const verifyCode = async (req, res, next) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            res.code = 404;
            throw new Error("User not found");
        }

        //user.isVerified === true  is same as user.isVerified
        if(user.isVerified){
            res.code = 400;
            throw new Error("User already verified")
        }

        const code = generateCode(6);

        user.verificationCode = code;
        await user.save();

        //send email
        await sendEmail({
            emailTo: user.email,
            subject: "Email Verification Code",
            code,
            content: "verify your account",
        })

        res.status(200).json({code: 200, status: true, message: "User verification sent succesfuly"});
    }catch(error) {
        next(error)
    }
};
  
 //verifying user- with code recieved through mail
const verifyUser = async(req, res, next) => {
    try{
        const {email, code} = req.body;

        const user = await User.findOne({ email });
        // const user = await User.findOne({ email });
        if(!user){
            req.code = 404;
            throw new Error("User not found")
        }

        if(user.verificationCode !== code){
            res.code = 400;
            throw new Error("Invalid code")
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({code: 200, status: true, message: "User verified successfully"})
    }catch(error){
        next(error);
    }
};

//forgot password code - it resends the code and stores the value in forgotpasswordCode
const forgotPasswordCode = async (req, res, next) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 404;
            throw new Error("User not found")
        }

        const code = generateCode(6);

        user.forgotPasswordCode = code;
        await user.save()

        await sendEmail({
            emailTo: user.email,
            subject: "Forgot password code",
            code,
            content: "change your password"
        });

        res.status(200).json({code: 200, status: true, messsage: "Forgot password code sent successfully"})
    }catch(error){
        next(error)
    }
};

//code for forget password
const recoverPassword = async (req, res, next)=> {
    try{
        const {email, code, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 400;
            throw new Error("User not found")
        }

        if(user.forgotPasswordCode !== code){
            res.code = 400;
            throw new Error("Invalid code")
        }
        
        const hashedPassword = await hashPassword(password)   //password will be converted into hash password

        user.password = hashedPassword  //hashed password will be stored in db
        user.forgotPasswordCode = null;
        await user.save();  
        
        res.status(200).json({code: 200, status: true, message: "Password recovered successfully"})
    }catch(error){
        next(error)
    }
};

  module.exports = {
    signup,
    verifyUser,
    verifyCode,
    forgotPasswordCode,
    recoverPassword
  };