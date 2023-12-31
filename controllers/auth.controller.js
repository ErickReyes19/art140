const { request, response } = require('express');
const bcrypt = require('bcrypt');
const db = require('../models/asistencia_art140/index');
const { generarJWT } = require('../helpers/generarjwt.helper');
const Usuario = db.user;

const login = async (req = request, res = response) => {
    try {
        const headerdecode = base64.decode(req.headers.authorization.split(' ')[1]);
        const username = headerdecode.split(':')[0];
        const password = headerdecode.split(':')[1];

        const user = await Usuario.findOne({
            where: {
                usuario: username
            },
        });

        if (!user) {
            return res.status(404).send({
                msg: "User Not found."
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Error, Contraseña invalida",
            });
        }

        const token = await generarJWT(user.idUsuario);

        return res.status(200).json({
            token: token,
            usuario: user.usuario,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error interno en el servidor"
        })
    }
}

const crearUsuario = async (req = request, res = response) => {

    const { username, password } = req.body;

    try {

        const encryptpass = bcrypt.hashSync(password, 8);

        await Usuario.create({
            usuario: username,
            password: encryptpass,
            idRol: idrol
        })

        return res.status(200).json({
            msg: "Usuario creado con éxito"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno en el servidor." + error
        })
    }
}

const getUsuario = async (req = request, res = response) => {

    const uid = req.uid;


    try {
        const user = await Usuario.findOne({
            where: {
                idUsuario: uid
            },
        });

        if (!user) {
            return res.status(404).json({
                msg: "No se encontró el usuario."
            })
        }


        return res.status(200).json({
            usuario: user.usuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno."
        });
    }

}

module.exports = {
    login,
    crearUsuario,
    getUsuario
}