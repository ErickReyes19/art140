const estudiante = require('../usuario.model');
const sala = require('../sala.model');
const usuarioSala = require('../usuariosala.model');


sala.belongsToMany(estudiante, {
  through: {
    model: usuarioSala,
    unique: false
  },
  foreignKey: 'idSala',
  otherKey: 'idEstudiante'
});

estudiante.belongsToMany(sala, {
  through: {
    model: usuarioSala,
    unique: false
  },
  foreignKey: 'idEstudiante',
  otherKey: 'idSala'
});

const db = {
  estudiante,
  sala,
  usuarioSala
};

module.exports = db;