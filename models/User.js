const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de Sequelize

const User = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    ultima_sesion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'usuarios', // Asegura que Sequelize use el nombre correcto de la tabla
    timestamps: false,    // Desactiva los timestamps automáticos de Sequelize
});

module.exports = User;
