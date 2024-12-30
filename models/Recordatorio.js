const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize
const Tarea = require('./Tarea'); // Importamos el modelo de tareas para la relación

const Recordatorio = sequelize.define('recordatorios', {
    id_recordatorio: {
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
    fecha_recordatorio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'recordatorios',
    timestamps: false,
});

module.exports = Recordatorio;
