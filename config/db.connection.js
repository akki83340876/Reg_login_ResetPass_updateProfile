require('dotenv').config()
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
})

try {
    sequelize.authenticate()
    console.log("Connection has been establised successfully with DataBase...!")
} catch (error) {
    console.error("Unable to connect to the database", error)
}

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ alter: true});

// Creat Table
db.User = require("../src/models/user.models")(sequelize, DataTypes);
// db.Notification = require("../src/models/notification")(sequelize, DataTypes);
// db.Feed = require("../src/models/feed.models")(sequelize, DataTypes);
// db.Category = require("../src/models/category.models")(sequelize, DataTypes);
// db.ProductDetails=require("../src/models/product.models")(sequelize, DataTypes);

// // Key's add
//  db.User.hasMany(db.Notification,{foreignkey:'UserId',as :'Notification'});
//  db.Notification.belongsTo(db.User,{foreignkey:'UserId',as :'User'});

//  db.User.hasMany(db.Feed,{foreignkey:'UserId',as :'Feed'});
//  db.Feed.belongsTo(db.User,{foreignkey:'UserId',as:'User'});

//  db.Category.hasMany(db.ProductDetails,{foreignkey:'CategoryId',as :'ProductDetails'});
//  db.ProductDetails.belongsTo(db.Category,{foreignkey:'CategoryId',as:'Category'});


module.exports=db;
