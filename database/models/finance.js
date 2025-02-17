const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Salary = sequelize.define('Salary', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

const Subscription = sequelize.define('Subscription', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,  // "shared" pour les abonnements communs
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = { Salary, Subscription };
