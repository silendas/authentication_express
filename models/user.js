const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provider: {
        type: DataTypes.STRING,
        defaultValue: 'local'
    },
    socialId: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    membershipTier: {
        type: DataTypes.ENUM('A', 'B', 'C'),
        defaultValue: 'A'
    }
});

module.exports = User;