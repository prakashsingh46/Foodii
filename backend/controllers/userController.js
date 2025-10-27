import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Problem in login API"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//Register user

const registerUser = async (req, res)=>{
    console.log("you are regisetering");
    const {name, password, email} = req.body;
    try {
        // checking if user already exist
        const exists =await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"user already exist"})
        }

        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"please provide a valid email"})
        }
        if(password.length<8){
            return res.json({success:false, message:"Password should contain atleast 8 characters"});
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hasshedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hasshedPassword
        });

        //save in the databse;
        const user = await newUser.save();
        
        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in registration"});
    }
}

export {loginUser, registerUser};