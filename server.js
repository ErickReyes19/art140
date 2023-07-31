const express = require('express');
const cors = require('cors');
const dbConection = require('./database/config');
const init = require("./config/init.config");
const path = require('path');

class Server {

    constructor() {
        this.app = express();

        process.env.TZ = 'America/Tegucigalpa';
        this.port = process.env.PORT || 3000;
        this.rutaAuth = '/auth';
        this.rutaEstudiante = '/estudiante';
        this.middlewares();
        this.routes();
    }

    async syncDB() {
        try {

            const db = require("./models/asistencia_art140");
            await dbConection.sync({
                force: true
            }).then(() => {
                init.initial();
            });
            console.log('base sincronizada');

        } catch (error) {
            console.log('error pai');
            console.log(error)
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json()); // Función de express que permite leer y parsear el body de una petición
        this.app.use(express.urlencoded({ extended: true }));
        
        
        //motor de plantilla
        this.app.set('view engine', 'ejs');
        this.app.set('views', __dirname + '/views')
        
        //Ruta vistas
        this.app.get('/', (req, res) => {
            res.render("index")
        })


        this.app.get('/postEstudiantes', (req, res) => {
            res.render("agregarestudiantes",)
        })

        this.app.get('/postEstudiantesActividad', (req, res) => {
            res.render("agregarestudiantesactividad",)
        })
        // Directorio público
        this.app.use(express.static(__dirname + '/public'));
    }

    // Endpoints 
    routes() {
        // Ruta de usuarios api
        this.app.use(this.rutaEstudiante, require('./routes/estudiantes.routes'));
        this.app.use(this.rutaAuth, require('./routes/auth.routes'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

}

module.exports = Server;
