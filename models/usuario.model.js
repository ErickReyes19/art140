const { DataTypes } = require('sequelize');
const dbConnection = require('../database/config');

const Estudiante = dbConnection.define('estudiante', {
  idEstudiante: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numeroCuenta: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  huella: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Estudiante;
