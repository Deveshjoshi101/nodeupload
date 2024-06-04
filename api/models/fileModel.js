const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const File = sequelize.define('File', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
});

sequelize.sync().then(() => {
  console.log('Files table created.');
});

module.exports = File;
