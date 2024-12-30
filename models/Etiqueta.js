const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize
const User = require('./User'); // Importamos el modelo de usuarios para la relación

const Etiqueta = sequelize.define('etiquetas', {
    id_etiqueta: {
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
    nombre_etiqueta: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'etiquetas',
    timestamps: false,
});

module.exports = Etiqueta;
