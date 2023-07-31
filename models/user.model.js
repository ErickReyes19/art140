const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const Usuario = dbConection.define("usuario", {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false, // no permite valores nulos
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false // no permite valores nulos
    },
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = Usuario;