const { AUTH_SENDEMAIL_USER, AUTH_SENDEMAIL_PASS } = process.env
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, html) => {
    let testAccount = await nodemailer.createTestAccount();
    // const data =  ejs.renderFile(template_path)


    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            //   requireTLS: true,
            auth: {
                user: process.env.AUTH_SENDEMAIL_USER,
                pass: process.env.AUTH_SENDEMAIL_PASS,
            },
        });


        const message = {
            from: process.env.AUTH_SENDEMAIL_USER,
            to: email,
            subject: subject,
            html: html
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', message, info);
            }
        });
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

module.exports = sendEmail
