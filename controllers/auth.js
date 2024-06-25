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