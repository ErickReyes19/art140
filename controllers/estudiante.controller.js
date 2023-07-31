const { request, response } = require('express');
const db = require('../models/asistencia_art140/index');

const Estudiantes = db.estudiante;


const getEstudiantes = async (req = request, res = response) => {
    try {
        const estudiantes = await Estudiantes.findAll();
        res.render('verestudiantes', { estudiantes });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error interno en el servidor"
        });
    }
};

const crearEstudiante = async (req, res) => {
    try {
        const { numeroCuenta, nombre, huella } = req.body;

        const nuevoEstudiante = await Estudiantes.create({
            numeroCuenta: numeroCuenta,
            nombre: nombre,
            huella: huella,
        });
        return res.redirect('/estudiante');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocurrió un error al crear el estudiante' });
    }
};




module.exports = {
    getEstudiantes,
    crearEstudiante
}