const zod = require('zod');
const User = require('../models/User');
const Account=require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, resp) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const userSchema = zod.object({
            username: zod.string(),
            password: zod.string(),
            firstName: zod.string(),
            lastName: zod.string(),
        })
        const checkFields = userSchema.safeParse({ username, password, firstName, lastName });
        if (!checkFields.success) {
            console.log(checkFields.error);
            return resp.status(400).json({
                success: false,
                message: "Invalid input fields"
            });
        }
        const checkUserExist = await User.findOne({ username });
        if (checkUserExist) {
            return resp.status(400).json({
                success: false,
                message: "User name already Exist."
            })
        }
        const hashedPasswod = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPasswod, firstName, lastName });
        const account=await Account.create({userId:newUser._id, balance:1000 });
        return resp.status(200).json({
            success: true,
            message: "Signup Success",
            newUser
        })
    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Login"
        })
    }
}
exports.login = async (req, resp) => {
    try {
        const { username, password } = req.body;
        const userSchema = zod.object({
            username: zod.string(),
            password: zod.string(),
        })
        const checkFields = userSchema.safeParse({ username, password });
        if (!checkFields.success) {
            console.log(checkFields.error);
            return resp.status(400).json({
                success: false,
                message: "Invalid input fields"
            });
        }
        const checkUserExist = await User.findOne({ username });
        if (!checkUserExist) {
            return resp.status(400).json({
                success: false,
                message: "You are not Registered With Us."
            })
        }
        if (await bcrypt.compare(password, checkUserExist.password)) {
            //Password Correct Make token
            const payload = {
                id:checkUserExist._id,
            }
            const token = jwt.sign(payload, "Hello", { expiresIn: "8h" });
            let userData = checkUserExist.toObject();
            userData.password = undefined;
            return resp.status(200).json({
                success: true,
                message: "Login Success",
                token,
                userData
            })
        }
        else {
            return resp.status(400).json({
                success: false,
                message: "Password Dont match",
                token
            })
        }


    }
    catch (err) {
        return resp.status(500).json({
            success: false,
            message: "Error in Login"
        })
    }
}
