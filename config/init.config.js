const db = require("../models/asistencia_art140/index");
const { DB } = require("../database/config");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config.js");
const Usuario = db.user;
const Estudiante = db.estudiante;

exports.initial = async () => {
    try {

        await Usuario.create({
            usuario: "david",
            password: bcrypt.hashSync(config.secret, 8),
        });

        await Estudiante.create({
            numeroCuenta: 20182300096,
            nombre: "Erick Jose Reyes Pineda",
            huella: "J8K8JHH6H$K8JHG9K8JHCF5K8JH",
            idUsuario: 1
        });
        await Estudiante.create({
            numeroCuenta: 20182300097,
            nombre: "Brayan Alexis Muñoz",
            huella: "J8K8JHH6H$K8JHG9K8JHCF5K8JH",
            idUsuario: 1
        });
        await Estudiante.create({
            numeroCuenta: 20182300096,
            nombre: "Erick Jose Reyes Pineda",
            huella: "J8K8JHH6H$K8JHG9K8JHCF5K8JH",
            idUsuario: 1
        });
        await Estudiante.create({
            numeroCuenta: 20182300097,
            nombre: "Brayan Alexis Muñoz",
            huella: "J8K8JHH6H$K8JHG9K8JHCF5K8JH",
            idUsuario: 1
        });
        await Estudiante.create({
            numeroCuenta: 20182300096,
            nombre: "Erick Jose Reyes Pineda",
            huella: "J8K8JHH6H$K8JHG9K8JHCF5K8JH",
            idUsuario: 1
        });
        await Estudiante.create({
            numeroCuenta: 20182300097,
            nombre: "Brayan Alexis Muñoz",
            huella: "J8K8JHH6H$K8JHG9K8JHCF5K8JH",
            idUsuario: 1
        });
    } catch (error) {
        console.log(error);
    }
};