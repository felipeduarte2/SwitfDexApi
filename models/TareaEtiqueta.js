const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize
const Tarea = require('./Tarea'); // Importamos el modelo de tareas
const Etiqueta = require('./Etiqueta'); // Importamos el modelo de etiquetas

const TareaEtiqueta = sequelize.define('tarea_etiqueta', {
    id_tarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Tarea,
            key: 'id_tarea',
        },
        onDelete: 'CASCADE',
    },
    id_etiqueta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Etiqueta,
            key: 'id_etiqueta',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'tarea_etiqueta',
    timestamps: false,
});

module.exports = TareaEtiqueta;
