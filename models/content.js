const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Article = sequelize.define('Article', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }
});

const Video = sequelize.define('Video', {
    title: { type: DataTypes.STRING, allowNull: false },
    videoUrl: { type: DataTypes.STRING, allowNull: false }
});

module.exports = { Article, Video };