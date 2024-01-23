const { Sequelize } = require('sequelize');
const path = require('path');

const db_connect = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../db/bot_conf.db'),
});

module.exports = db_connect;
