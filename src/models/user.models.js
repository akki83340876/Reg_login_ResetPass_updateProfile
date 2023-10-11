const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role_type:{
    type: DataTypes.ENUM,
    value:["Consultancy","Employer","Recruiter"],
    defaultValue:null,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull:true,
    defaultValue:false,
  },
  confirm_password: {
    type: DataTypes.STRING,
    allowNull:true,
    defaultValue:false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:false,

  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue:false,
  }
}, {
  
});
return User;
}

  