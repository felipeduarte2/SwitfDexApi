const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

// Importa todos los modelos
const User = require('./User');
const Categoria = require('./Categoria');
const Tarea = require('./Tarea');
const Etiqueta = require('./Etiqueta');
const TareaEtiqueta = require('./TareaEtiqueta');
const Recordatorio = require('./Recordatorio');
const Historial = require('./Historial');

// Relaciones
User.hasMany(Categoria, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Categoria.belongsTo(User, { foreignKey: 'id_usuario' });

User.hasMany(Tarea, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Tarea.belongsTo(User, { foreignKey: 'id_usuario' });

Categoria.hasMany(Tarea, { foreignKey: 'id_categoria', onDelete: 'SET NULL' });
Tarea.belongsTo(Categoria, { foreignKey: 'id_categoria' });

// Relaciones para etiquetas
User.hasMany(Etiqueta, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Etiqueta.belongsTo(User, { foreignKey: 'id_usuario' });

// Relaciones para tarea_etiqueta
Tarea.belongsToMany(Etiqueta, { through: TareaEtiqueta, foreignKey: 'id_tarea', onDelete: 'CASCADE' });
Etiqueta.belongsToMany(Tarea, { through: TareaEtiqueta, foreignKey: 'id_etiqueta', onDelete: 'CASCADE' });

// Relaciones para recordatorios
Tarea.hasMany(Recordatorio, { foreignKey: 'id_tarea', onDelete: 'CASCADE' });
Recordatorio.belongsTo(Tarea, { foreignKey: 'id_tarea' });

// Relaciones para historial
Tarea.hasMany(Historial, { foreignKey: 'id_tarea', onDelete: 'CASCADE' });
Historial.belongsTo(Tarea, { foreignKey: 'id_tarea' });



// Inicializa los modelos con la instancia de Sequelize
User.sync(); // Asegúrate de que la tabla esté sincronizada
Categoria.sync();
Tarea.sync();
Etiqueta.sync();
TareaEtiqueta.sync();
Recordatorio.sync();
Historial.sync();


// Exporta los modelos y la instancia de Sequelize
module.exports = {
    sequelize,
    Sequelize,
    User,
    Categoria,
    Tarea,
    Etiqueta,
    TareaEtiqueta,
    Recordatorio,
    Historial
};

