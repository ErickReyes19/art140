'Ruta: /api/estudiante';

const { Router } = require('express');

const {getEstudiantes, crearEstudiante, getEstudiante,getHuella } = require('../controllers/estudiante.controller');


const router = Router();

router.get('/', getEstudiantes);
router.post('/', crearEstudiante);
router.get('/buscar', getEstudiante);
router.get('/huella', getHuella);


module.exports = router;