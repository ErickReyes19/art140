const { request, response } = require('express');
const db = require('../models/asistencia_art140/index');

const Estudiantes = db.estudiante;


const Fingerprint = require("adafruit-fingerprint").Fingerprint





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
const getEstudiante = async (req = request, res = response) => {
    const { huella } = req.query;
    console.log(huella);
    try {
        const estudiante = await Estudiantes.findOne({
            where: {
                huella: huella
            }
        });
        if (estudiante) {
            res.render('estudientaencontrado', { estudiante });
        } else {
            res.render('estudiantenoencontrado');
        }


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

const getHuella = async (req, res) => {
    try {
        // change devicePath with a real device path or use serialNumber option
        const devicePath = "COM23" // or something like "COM3" on Windows

        const sensorOptions = {
            // init with sensor serial port path
            serialPort: devicePath,
            // serialNumber: "xxxxxx",
            baudRate: 57600,
            // ...
        }

        const finger = new Fingerprint(sensorOptions)


        finger.on("ready", async (s) => {
            console.log("✅ Fingerprint Sensor is ready")


        })

        finger.on("port-error", (err) => {
            console.log("Error 1" + err)
        })
        finger.on("port-close", (err) => {
            console.log("error 2 " + err)
        })

        // return res.redirect('/estudiante');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocurrió un error al crear el estudiante' });
    }
};



module.exports = {
    getEstudiantes,
    crearEstudiante,
    getEstudiante,
    getHuella
}