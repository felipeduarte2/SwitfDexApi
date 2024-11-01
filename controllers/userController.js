const db = require('../db');
const bcrypt = require('bcrypt'); // Para encriptar las contraseñas
const jwt = require('jsonwebtoken'); // Para manejar el token de usuario

// Clave secreta para el token JWT (puede estar en el archivo .env)
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";


/* Función para registrarse (Registro) */
exports.signup = (req, res) => {
    const { nombre, email, password } = req.body;

    // Verifica si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (result.length > 0) return res.status(400).json({ error: 'El usuario ya existe' });

        // Si no existe, encripta la contraseña y crea el usuario
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

            const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
            db.query(query, [nombre, email, hash], (err, result) => {
                if (err) return res.status(500).json({ error: 'Error al crear el usuario' });
                res.status(201).json({ message: 'Usuario creado exitosamente' });
            });
        });
    });
};


/* Función para iniciar sesión (Inicio de sesión) */
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Busca el usuario por email
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (result.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const user = result[0];

      // Verifica la contraseña
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Error al comparar la contraseña' });
            if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

        // Genera un token JWT
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Inicio de sesión exitoso', token });
        });
    });
};
