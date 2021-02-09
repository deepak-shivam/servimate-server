const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Models
const User = require('../model/user')

//Config
const keys = require('../config/keys')

//SEND MAIL
const sendEmail = require('../utils/nodemailer')

module.exports = {
    userRegister: async (req, res, next) => {
        try {
            let errors = {}
            const { name, email, password, phoneNumber, role } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 15)
            const newUser = await new User({
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                role
            })
            // function generateOTP() {
            //     var digits = '0123456789';
            //     let OTP = '';
            //     for (let i = 0; i < 6; i++) {
            //         OTP += digits[Math.floor(Math.random() * 10)];
            //     }
            //     return OTP;
            // }
            // const OTP = generateOTP()
            // newUser.verificationToken = OTP
            // await sendEmail(newUser.email, OTP, "OTP")
            // console.log("papa")
            await newUser.save()
            // res.status(200).json({ message: "check your registered email for OTP" })
            res.status(200).json({message: "User registerd successfully, kindly login", success: true, response: newUser})
            // const helper = async () => {
            //     faculty.otp = ""
            //     await faculty.save()
            // }
            // setTimeout(function () {
            //     helper()
            // }, 300000);
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({ message: `Error in userRegister ${err.message}` })
        }
    },
    userLogin: async (req, res, next) => {
        try {
            let errors = {}
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user) {
                errors.email = "Email doesnt not exist"
                return res.status(400).json(errors)
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const { _id, name, phoneNumber } = user
            const payload = {
                _id, name, phoneNumber, email
            }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        message: "User logged in successfully",
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );

        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }
    }
}


