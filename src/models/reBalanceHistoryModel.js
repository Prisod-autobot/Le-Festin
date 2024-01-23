const { DataTypes } = require('sequelize');
const db_conn = require('../config/db_conn');

const ReBalanceHistory = db_conn.define('HistoryReBalance', {
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Asset_value: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    Cash_value: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    Price: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    Amount_asset: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Last_asset_value: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    Rebalance_difference: {
        type: DataTypes.REAL,
        allowNull: false,
    },
}, {
    tableName: 're_balance_db',
    timestamps: false,
});

module.exports = ReBalanceHistory;
