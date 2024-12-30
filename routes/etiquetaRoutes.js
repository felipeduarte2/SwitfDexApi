const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/etiquetaController');
const verificarToken = require('../middlewares/authMiddleware');

// Crear una etiqueta
router.post('/', verificarToken, etiquetaController.crearEtiqueta);

// Obtener todas las etiquetas del usuario autenticado
router.get('/', verificarToken, etiquetaController.obtenerEtiquetasPorUsuario);

// Actualizar una etiqueta
router.put('/:id_etiqueta', verificarToken, etiquetaController.actualizarEtiqueta);

// Eliminar una etiqueta
router.delete('/:id_etiqueta', verificarToken, etiquetaController.eliminarEtiqueta);

module.exports = router;
