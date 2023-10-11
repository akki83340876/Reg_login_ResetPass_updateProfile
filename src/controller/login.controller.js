// const express = require('express');
// const db = require('../../config/db.connection');
// const { Op } = require("sequelize");
// const bcrypt = require('bcrypt');
// const randomstring = require('randomstring');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto'); // Add this line

// require('../services/token.service');
// const User = db.User;

// module.exports.social_login = async (req, res) => {
// 	try {
// 		const email = req.body.email;

// 		const signup = await User.findOne({
// 			where: {
// 				[Op.or]: [{ email: email }],
// 			},
// 		});

// 		if (!signup) {
// 			return res.send({
// 				statuscode: 200,
// 				message: "User not found",
// 			});
// 		}

// 		if (signup.status == 1) {
// 			const token = crypto.randomBytes(16).toString('hex');

// 			console.log("signup == 1");

// 			await User.update({
// 				token: token,
// 			}, {
// 				where: { email: req.body.email }
// 			});

// 			if (signup.token == 0) {
// 				await User.update({
// 					status: 1
// 				}, {
// 					where: { email: req.body.email }
// 				});

// 				console.log("signup == 0");

// 				return res.send({
// 					status: true,
// 					message: "Social login successful",
// 				});
// 			} else {
// 				return res.send({
// 					status: false,
// 					message: "Email already exists",
// 				});
// 			}
// 		} else {
// 			return res.send({
// 				statuscode: 200,
// 				message: "Please verify your OTP",
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).send({
// 			status: false,
// 			message: "Internal server error",
// 		});
// 	}
// };

const jwt = require("jsonwebtoken")
const db = require("../../config/db.connection");
const User = db.User;
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('../services/token.service')

exports.user_login = async (req, res, next) => {

    try {
        if (!req.body.email) {
            return res.status(400).json({ error: 'Please enter your email ' });
        }
        if (!req.body.password) {
            return res.status(400).json({ error: 'please enter your password' });
        }
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        //console.log(validPassword)

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const verifyEmail = await User.findOne({
            where: {
                status: 1,
                email: req.body.email
            }
        })
        if (!verifyEmail) {
            res.status(400).json({ message: 'Please verify your email first then try to login' })
        }

        const access_token = generateAccessToken(user)
        const refresh_token = generateRefreshToken()
        const Refresh_token_expiration = Date.now() + (7 * 24 * 60*  60 * 1000);// 7 days

        user.refreshToken = refresh_token
        user.refreshToken_Expiration = Refresh_token_expiration
        await user.save()
        const {  email, password  } = user
        const user_data = {
            email: email,
            password : password 
        }


        // res.cookie("access_token", access_token, { httpOnly: true })
        // res.cookie("refresh_token", refresh_token, { httpOnly: true })
        res.cookie("refresh_token", refresh_token, { httpOnly: true })

        return res.status(200).json({
            message: "Successfully login",
            data: user_data,
            access_token: access_token
        })
    }
    catch (error) {
    console.log(error);
    return res.json({msg: "Login failed....!"})
    }
}