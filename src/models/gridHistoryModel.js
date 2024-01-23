// HistoryGrid.js
const { DataTypes } = require('sequelize');
const db_conn = require('../config/db_conn');


const GridHistory = db_conn.define('HistoryGrid', {
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_buy: {
        type: DataTypes.TEXT,
    },
    id_sell: {
        type: DataTypes.TEXT,
    },
    date_buy: {
        type: DataTypes.TEXT,
    },
    date_sell: {
        type: DataTypes.TEXT,
    },
    date_done: {
        type: DataTypes.TEXT,
    },
    pair: {
        type: DataTypes.TEXT,
    },
    price_buy: {
        type: DataTypes.REAL,
    },
    fee_buy: {
        type: DataTypes.REAL,
    },
    total_cost_buy: {
        type: DataTypes.REAL,
    },
    price_sell: {
        type: DataTypes.REAL,
    },
    fee_sell: {
        type: DataTypes.REAL,
    },
    total_cost_sell: {
        type: DataTypes.REAL,
    },
    status_buy: {
        type: DataTypes.TEXT,
    },
    status_sell: {
        type: DataTypes.TEXT,
    },
    zone: {
        type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'history_grid',
    timestamps: false,
});

module.exports = GridHistory;
