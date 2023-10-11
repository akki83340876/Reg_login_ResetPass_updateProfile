const db = require("../../config/db.connection");
const User = db.User;
const bcrypt = require('bcrypt'); // Make sure to import the bcrypt library
const jwt = require("jsonwebtoken");
require('../services/token.service');
const sendEmail = require('../controller/sendMail.controller')

exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const isEmptykey = Object.keys(req.body).some(key => {
            const value = req.body[key];
            return value === '' || value === null || value === undefined;
        });

        if (isEmptykey) {
            return res.status(400).json({ error: "please do not give empty fields" });
        }

        const accountData = await User.findOne({
            where: { email: req.body.email }
        });

        if (accountData !== null && accountData !== undefined) {
            // Ensure that process.env.JWT is defined and not empty
            if (!process.env.JWT) {
                return res.status(500).json({
                    success: false,
                    message: "JWT secret key is not defined in the environment variables"
                });
            }

            const remember_token = jwt.sign({ id: accountData.id }, process.env.JWT, { expiresIn: "10m" });
            accountData.token =remember_token,
            await accountData.save()
            
            const link = `http://localhost:3001`;

            const subject = 'click on below link for reset your password'

            const html = `<h1>Reset Password</h1>
                <p>Please click the link below to verify your mail:</p>
                <p><a href="${link}/reset/${remember_token}">verify email</a></p>
                <p>Thank you,</p> 
                <p>Dear</p>`
    
            sendEmail(email, subject, html)

            return res.status(200).json({
                success: true,
                message: "Password reset successfully",
                token: remember_token,
                id: accountData.id
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Password is not updated or please provide your valid email"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.verifyPassword = async (req, res, next) => {
    const { remember_token } = req.params;
    console.log(remember_token);
    const { newPassword, confirm_password } = req.body;
console.log(newPassword);
console.log(confirm_password);
    try {
        const user = await User.findOne({
            where: {
                token: remember_token
            }
        });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (remember_token !== user.token) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }
       // Validation for the new password
        if (!newPassword || !confirm_password) {
            return res.status(400).json({ error: "New password and confirmation are required" });
        }

        if (newPassword !== confirm_password) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const hashNewPassword = await bcrypt.hash(confirm_password, 10);

        user.password = hashNewPassword;
        user.token = null; // Clear the reset token
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
