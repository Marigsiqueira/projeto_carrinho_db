const Sequelize = require('sequelize');


const database = new Sequelize("loja", 'root','',{
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
})

module.exports = database;

