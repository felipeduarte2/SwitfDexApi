const express = require('express');
const sequelize = require('./config/database'); // Importa la conexión de Sequelize
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const etiquetaRoutes = require('./routes/etiquetaRoutes');
const tareaEtiquetaRoutes = require('./routes/tareaEtiquetaRoutes');
const recordatorioRoutes = require('./routes/recordatorioRoutes');
const historialRoutes = require('./routes/historialRoutes');

require('dotenv').config();

// Middleware
app.use(express.json());

// Ruta de ejemplo para probar la conexión
app.get('/', (req, res) => {
    res.send('API de SwiftDex funcionando');
});

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/etiquetas', etiquetaRoutes);
app.use('/api/tarea-etiquetas', tareaEtiquetaRoutes);
app.use('/api/recordatorios', recordatorioRoutes);
app.use('/api/historial', historialRoutes);

// Sincronizar modelos y luego iniciar el servidor
(async () => {
    try {
        await sequelize.sync(); // Sincroniza los modelos con la base de datos
        console.log('Modelos sincronizados con la base de datos');

        // Iniciar el servidor
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();

