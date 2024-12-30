const express = require('express');
const router = express.Router();
const recordatorioController = require('../controllers/recordatorioController');
const verificarToken = require('../middlewares/authMiddleware');

// Crear un recordatorio
router.post('/', verificarToken, recordatorioController.crearRecordatorio);

// Obtener recordatorios de una tarea
router.get('/:id_tarea', verificarToken, recordatorioController.obtenerRecordatoriosDeTarea);

// Actualizar un recordatorio
router.put('/', verificarToken, recordatorioController.actualizarRecordatorio);

// Eliminar un recordatorio
router.delete('/:id_recordatorio', verificarToken, recordatorioController.eliminarRecordatorio);

module.exports = router;
