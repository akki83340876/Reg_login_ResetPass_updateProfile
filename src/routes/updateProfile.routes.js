const express = require('express');
const router = express.Router()


const {update_profile_details} = require('../controller/updateProfile.controller');


router.patch("/updateprofile",update_profile_details);

module.exports = router;