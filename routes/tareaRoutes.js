const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const verificarToken = require('../middlewares/authMiddleware');

// Crear una tarea
router.post('/', verificarToken, tareaController.crearTarea);

// Obtener todas las tareas del usuario autenticado
router.get('/', verificarToken, tareaController.obtenerTareasPorUsuario);

// Actualizar una tarea
router.put('/:id_tarea', verificarToken, tareaController.actualizarTarea);

// Eliminar una tarea
router.delete('/:id_tarea', verificarToken, tareaController.eliminarTarea);

module.exports = router;
