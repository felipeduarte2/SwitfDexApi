const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize
const User = require('./User'); // Importamos el modelo de usuarios para la relación
const Categoria = require('./Categoria'); // Importamos el modelo de categorías para la relación

const Tarea = sequelize.define('tareas', {
    id_tarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_usuario',
        },
        onDelete: 'CASCADE',
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Categoria,
            key: 'id_categoria',
        },
        onDelete: 'SET NULL',
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
        defaultValue: 'pendiente',
    },
    prioridad: {
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        defaultValue: 'media',
    },
}, {
    tableName: 'tareas',
    timestamps: false,
});

module.exports = Tarea;
