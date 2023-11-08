const express = require("express")
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
 require('./config/db.connection'); 
require('dotenv').config();
const userRouter = require("./src/routes/user.routes");
const loginRouter = require("./src/routes/login.routes");
const resetPassword = require("./src/routes/resetpassword.routes");
const updateProfile = require("./src/routes/updateProfile.routes");
const app = express();

// Add body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/',userRouter);
app.use('/',loginRouter);
app.use('/',resetPassword);
app.use('/',updateProfile);

app.listen(3001,()=>{
    console.log("Server Started at link http://localhost:3001");
});
