const estudiante = require('../estudiante.model');
const user = require('../user.model');


estudiante.belongsTo(user, {
  foreignKey: 'idUsuario'
});




const db = {
  estudiante,
  user
};

module.exports = db;