const { DataTypes } = require('sequelize');
const dbConection = require('../database/config');

const UsuarioSala = dbConection.define("usuario_sala", {
    idSala: {
        type: DataTypes.INTEGER,

    },
    idEstudiante: {
        type: DataTypes.BIGINT,
    }
}, {
    timestamps: true,
    freezeTableName: true
});
module.exports = UsuarioSala;