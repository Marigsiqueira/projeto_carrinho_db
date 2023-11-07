const database = require('../config/index');
const Sequelize = require('sequelize')

const usuarioModels = database.define('usuarios', {
    idUsuario: {
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome : Sequelize.STRING(50),
    senha : Sequelize.STRING(100)
});

database.sync();

module.exports = usuarioModels;