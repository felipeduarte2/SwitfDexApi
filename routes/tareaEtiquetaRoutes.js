const express = require('express');
const router = express.Router();
const tareaEtiquetaController = require('../controllers/tareaEtiquetaController');
const verificarToken = require('../middlewares/authMiddleware');

// Asignar una etiqueta a una tarea
router.post('/', verificarToken, tareaEtiquetaController.asignarEtiquetaATarea);

// Obtener etiquetas de una tarea
router.get('/:id_tarea', verificarToken, tareaEtiquetaController.obtenerEtiquetasDeTarea);

// Eliminar una etiqueta de una tarea
router.delete('/', verificarToken, tareaEtiquetaController.eliminarEtiquetaDeTarea);

module.exports = router;
