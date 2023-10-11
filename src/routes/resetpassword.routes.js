const express = require('express');
const router = express.Router()


const { resetPassword ,verifyPassword} = require('../controller/resetPassword.controller');

router.post("/resetPassword",resetPassword);
router.get("/reset/:remember_token", verifyPassword);
module.exports = router;