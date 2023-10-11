const express = require("express");

const router = express.Router()


const routerControlller = require('../controller/user.controller');

router.post("/register",routerControlller.createUser);
router.get("/verify-email/:remember_token",routerControlller.verifyUser);

// // Feed Routes
// var uploadimages = upload.fields([{ name: 'add_product_img', maxCount: 1 },
//                                   { name: 'attachments', maxCount: 1 }
//                                 ]);

// router.post("/insertfeeddetails",uploadimages,insertFeedDetails)
// router.get("/getFeedDetails",getFeedDetails)
// //Product Routes
// var uploadProducticon = upload.fields([{ name: 'product_icon', maxCount: 1 }]);
// router.post("/addproduct",uploadProducticon,productRoutes.addProduct);
// router.get("/getproduct",productRoutes.getProduct);


module.exports = router;


