const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verifica el token y extrae los datos
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded; // Decoded contiene id y email del usuario
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(401).json({ error: 'Token no válido o expirado' });
    }
};

module.exports = verificarToken;
