const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Terhubung!');

        await sequelize.sync({ alter: true }); 
        console.log('Tabel User berhasil disinkronkan.');
    } catch (error) {
        console.error('Gagal konek:', error.message);
    }
}

module.exports = { sequelize, connectDB };