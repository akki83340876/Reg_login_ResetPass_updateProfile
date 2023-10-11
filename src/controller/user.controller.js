//verification with email

const db = require("../../config/db.connection");
const bcrypt = require('bcrypt');
const secret_key = process.env.SECRET_KEY
const randomstring = require('randomstring');
 const sendEmail=require('./sendMail.controller');
const User = db.User;
const jwt = require("jsonwebtoken")

const url = 'http://localhost:3001'


exports.createUser = async (req, res, next) => {
    const {  name, email, role,country,password, number,state,city,company_name, token,status,confirm_password} = req.body
    try {

        const isEmptykey = Object.keys(req.body).some(key => {
            const value = req.body[key]
            return value === '' || value === null || value === undefined;
        })
        if (isEmptykey) {
            return res.status(400).json({ error: "please do not give empty fileds" })
        }


        if (password !== confirm_password) {
            return res.status(400).json({ error: "Please enter the same password" })
        }
        
        const existingUser = req.body.email;
          if (!existingUser) {
          return res.status(400).json({ error: "Email is required" });
        }
        const hashedPassword = await bcrypt.hash(confirm_password, 10)

        const remember_token = jwt.sign({ email:email }, secret_key, { expiresIn: '7d' });

        const newUser = await User.create({
                        name: name,
                        email: email,
                        role:role,
                        company_name:company_name,
                        country:country,
                        state:state,
                        city:city,
                        password: hashedPassword,
                        number:number,
                        status:status,
                        token: remember_token
                    });
        const subject = 'Registration Successfull And Verify Email'

        const html = `<h1>Verify Email</h1>
            <p>Hi ${name[0]}</p>
            <p>Please click the link below to verify your mail:</p>
            <p><a href="${url}/verify-email/${remember_token}">verify email</a></p>
            <p>Thank you,</p> 
            <p>Dear</p>`

        sendEmail(email, subject, html)

        //console.log(`Remember_Token: ${remember_token}`);

        return res.status(200).json({
            status: true,
            message: "User risgter successfully",
            data: newUser
        })

    }
    catch (error) {
        console.log(error);
        return res.json({msg:"internal server error"})
    }
}


exports.verifyUser = async (req, res, next) => {
    const { remember_token } = req.params

    try {
        const user = await User.findOne({
            where: {
                token: remember_token
            }
        })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        if (remember_token !== user.token) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        user.status = 1,
            user.email_verified_at = Date.now(),
            user.remember_token = null,
            await user.save()

        return res.status(200).json({
            status: true,
            message: "Email verified successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
