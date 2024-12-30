const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware')

// Rutas para Signup y Login
router.post('/signup', userController.signup);
router.post('/login', userController.login);
// Actualizar un usuario por ID
router.put('/:id', verificarToken, userController.updateUser);
// Eliminar un usuario por ID
router.delete('/:id', verificarToken, userController.deleteUser);

module.exports = router;
