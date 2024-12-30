const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');
const verificarToken = require('../middlewares/authMiddleware');

// Crear una entrada en el historial
router.post('/', verificarToken, historialController.crearEntradaHistorial);

// Obtener el historial de una tarea
router.get('/:id_tarea', verificarToken, historialController.obtenerHistorialDeTarea);

// Eliminar una entrada del historial
router.delete('/:id_historial', verificarToken, historialController.eliminarEntradaHistorial);

module.exports = router;
