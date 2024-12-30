const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriaController');
const verificarToken = require('../middlewares/authMiddleware');

// Crear una nueva categoría
router.post('/', verificarToken, categoriasController.crearCategoria);

// Obtener todas las categorías del usuario
router.get('/', verificarToken, categoriasController.obtenerCategorias);

// Actualizar una categoría
router.put('/:id_categoria', verificarToken, categoriasController.actualizarCategoria);

// Eliminar una categoría
router.delete('/:id_categoria', verificarToken, categoriasController.eliminarCategoria);

module.exports = router;
