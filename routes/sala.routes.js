'Ruta: /api/estudiante';

const { Router } = require('express');

const {getSalaEstudiante, postSalaEstudiante} = require('../controllers/sala.controller');


const router = Router();

router.get('/', getSalaEstudiante);
router.post('/', postSalaEstudiante);


module.exports = router;