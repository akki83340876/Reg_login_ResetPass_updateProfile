const express = require('express');
const router = express.Router()


const loginControlller = require('../controller/login.controller');


router.post("/user_login",loginControlller.user_login);
module.exports = router;