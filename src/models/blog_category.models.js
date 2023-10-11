const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
 const Blog_Category = sequelize.define('Blog_Category', {
  // Model attributes are defined here
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  blog_categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue:false,
  }
}, {
  
});
return Blog_Category;
}

  