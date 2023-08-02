const { DataTypes } = require('sequelize');
const dbConnection = require('../database/config');

const Sala = dbConnection.define('sala', {
  idSala: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Sala;
