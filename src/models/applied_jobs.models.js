const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
 const applied_jobs = sequelize.define('applied_jobs', {
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
  role_type:{
    type: DataTypes.STRING,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue:false,
  }
}, {
  
});
return applied_jobs;
}

  