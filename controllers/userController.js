const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importa el modelo User

// Clave secreta para el token JWT (debería estar en el archivo .env)
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";

/* Función para registrarse (Registro) */
exports.signup = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo usuario
        await User.create({ nombre, email, contrasena: hashedPassword });

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

/* Función para iniciar sesión (Inicio de sesión) */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Genera un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    try {
        // Busca el usuario por ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualiza los campos (encripta la contraseña si se proporciona una nueva)
        if (password) {
            user.contrasena = await bcrypt.hash(password, 10);
        }
        if (nombre) user.nombre = nombre;
        if (email) user.email = email;

        await user.save();

        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

/* Función para eliminar usuario */
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Busca el usuario por ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Elimina el usuario
        await user.destroy();

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
