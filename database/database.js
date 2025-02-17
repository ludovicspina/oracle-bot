const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('oracle', 'ludo', 'N9isrmb3@', {
    host: '192.168.1.116',  // Votre Raspberry Pi
    dialect: 'mysql',
    logging: false,  // Désactive les logs SQL
});

module.exports = sequelize;
