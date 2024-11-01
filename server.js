const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Middleware
app.use(express.json());

// Ruta de ejemplo para probar la conexión
app.get('/', (req, res) => {
    res.send('API de SwiftDex funcionando');
});

// Rutas
app.use('/api/usuarios', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
