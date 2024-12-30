const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize
const Tarea = require('./Tarea'); // Importamos el modelo de tareas para la relación

const Historial = sequelize.define('historial', {
    id_historial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tarea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tarea,
            key: 'id_tarea',
        },
        onDelete: 'CASCADE',
    },
    cambio_descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_cambio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'historial',
    timestamps: false,
});

module.exports = Historial;
