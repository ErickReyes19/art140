const db = require("../models/asistencia_art140/index");
const { DB } = require("../database/config");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config.js");
const Sala = db.sala;
const Estudiante = db.estudiante;

exports.initial = async () => {
    try {
        await Sala.create({
            idSala: 1,
            nombre: "Laboratorio IS"
        })
        await Estudiante.create({
            numeroCuenta: 20182300096,
            nombre: "Erick Jose Reyes Pineda"
        });
        await Estudiante.create({
            numeroCuenta: 20182300097,
            nombre: "Brayan Alexis Muñoz",

        });
        await Estudiante.create({
            numeroCuenta: 20182300096,
            nombre: "Erick Jose Reyes Pineda"
        });
        await Estudiante.create({
            numeroCuenta: 20182300097,
            nombre: "Brayan Alexis Muñoz",

        });
        await Estudiante.create({
            numeroCuenta: 20182300096,
            nombre: "Erick Jose Reyes Pineda"
        });
        await Estudiante.create({
            numeroCuenta: 20182300097,
            nombre: "Brayan Alexis Muñoz"
        });
        await Estudiante.create({
            numeroCuenta: 11111,
            nombre: "Brayan Alexis Muñoz"
        });
    } catch (error) {
        console.log(error);
    }
};