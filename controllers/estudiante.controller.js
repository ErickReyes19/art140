const { request, response } = require('express');
const db = require('../models/asistencia_art140/index');

const Estudiantes = db.estudiante;


const Fingerprint = require("adafruit-fingerprint").Fingerprint

const devicePath = "COM23" // or something like "COM3" on Windows

const sensorOptions = {
    // init with sensor serial port path
    serialPort: devicePath,
    // serialNumber: "xxxxxx",
    baudRate: 57600,
    // ...
}

const finger = new Fingerprint(sensorOptions)





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

    const idHuella = await finger.search()
    console.log(idHuella.pageId);
    try {
        const estudiante = await Estudiantes.findOne({
            where: {
                idEstudiante: idHuella.pageId
            }
        });


        if (estudiante) {
            res.render('estudientaencontrado', { estudiante });
        } else {
            res.render('estudiantenoencontrado');
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocurrió un error al crear el estudiante :(' });
    }
};

const crearEstudiante = async (req, res) => {
    console.log("Entro al crear estudiante");
    try {
        const { numeroCuenta, nombre } = req.body;

        const nuevoEstudiante = await Estudiantes.create({
            numeroCuenta: numeroCuenta,
            nombre: nombre,
        });
        console.log("idEstudiante creado");
        console.log(nuevoEstudiante.idEstudiante);

        console.log("Capturando la primera imagen de huella...");
        finger.readFingerprint(15, 1); // Capturar primera imagen
        console.log("Coloque su huella en el modal...");


        const huellaPageId = await finger.enroll({
            pageId: nuevoEstudiante.idEstudiante
        });

        console.log("Huella creada");
        console.log(huellaPageId);

        return res.redirect('/estudiante');

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocurrió un error al crear el estudiante' });
    }
};


const getHuella = async (req, res) => {
    try {

        finger.enroll("ready", async (s) => {
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