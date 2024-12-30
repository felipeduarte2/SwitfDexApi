require('dotenv').config();
const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize con los datos de conexión
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Tipo de base de datos
    port: process.env.DB_PORT, // Puerto
    logging: false, // Desactiva el log de SQL para mayor limpieza
  }
);

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa con Sequelize');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;
