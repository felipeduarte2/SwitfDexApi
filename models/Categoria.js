const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize
const User = require('./User'); // Importamos el modelo de usuarios para la relación

const Categoria = sequelize.define('categorias', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id_usuario',
        },
        onDelete: 'CASCADE',
    },
    nombre_categoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'categorias',
    timestamps: false,
});

module.exports = Categoria;
