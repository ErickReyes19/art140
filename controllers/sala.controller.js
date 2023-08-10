const { request, response } = require('express');
const db = require('../models/asistencia_art140/index');
const UsuarioSala = require('../models/usuariosala.model');
const moment = require('moment');

const Sala = db.sala;
const Estudiante = db.estudiante;
const SalaEstudiante = db.usuarioSala;


const getSalaEstudiante = async (req= request, res= response) => {
    try {
        const salas = await Sala.findAll({
            include: [
                {
                    model: Estudiante,
                },
            ],
        });
        console.log("MAMALOOOOOON----------------")
        console.log(salas[0].dataValues.estudiantes[0].usuario_sala.createdAt)

        const fechaFormateada = moment(fecha).locale('es').format('dddd DD [de] MMMM [del] YYYY h:mm:ss a');

        res.render('versalas', { salas });



    } catch (error) {
        console.error('Error al obtener información de usuarioSala:', error);
        return [];
    }
};


const postSalaEstudiante = async (req, res) => {
    const { idEstudiante } = req.body;
    const idSala = 1;

    try {
        const salaEstudiante = await SalaEstudiante.create({
            idSala: idSala,
            idEstudiante: idEstudiante
        });
        return res.redirect('/postEstudiantesActividad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Ocurrió un error interno en el servidor" });
    }
};

module.exports = {

    getSalaEstudiante,
    postSalaEstudiante
}
