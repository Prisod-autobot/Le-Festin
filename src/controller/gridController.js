const GridModel = require('../models/gridModel');

async function insertGridData(botConfigData) {
    const existingBot = await GridModel.findOne({
        where: { bot_name: botConfigData.botName }
    });

    if (existingBot) {
        console.error(`Bot with name '${botConfigData.botName}' already exists.`);
        return null;
    }

    const gridConfig = {
        grid_id: botConfigData.grid_id,
        bot_name: botConfigData.botName,
        api_key: botConfigData.apiKey,
        api_secret: botConfigData.secretKey,
        pair: botConfigData.pair,
        exchange_name: botConfigData.exchangeName,
        budget: parseFloat(botConfigData.budget),
        up_zone: parseFloat(botConfigData.upZone),
        low_zone: parseFloat(botConfigData.lowZone),
        amount: parseFloat(botConfigData.amount),
        grid_qty: parseInt(botConfigData.gridQuantity),
        grid_step: parseInt(botConfigData.gridStep),
        type_zone_calculation: parseInt(botConfigData.zoneCalculator),
    };
    try {
        const result = await GridModel.create(gridConfig);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Add other CRUD operations as needed
async function findOneByBotName(botName) {
    try {
        const bot = await GridModel.findOne({
            where: { bot_name: botName }
        });
        return bot;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function findAllGridData() {
    try {
        const allGridData = await GridModel.findAll();
        return allGridData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateGridData(botName, updatedData) {
    try {
        const [updatedRowsCount, updatedRows] = await GridModel.update(updatedData, {
            where: { bot_name: botName },
            returning: true, // Include the updated rows in the result
        });

        if (updatedRowsCount === 0) {
            console.error(`Bot with name '${botName}' not found.`);
            return null;
        }

        return updatedRows[0].get(); // Return the updated data
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteGridData(botName) {
    try {
        const deletedRowCount = await GridModel.destroy({
            where: { bot_name: botName }
        });

        if (deletedRowCount === 0) {
            console.error(`Bot with name '${botName}' not found.`);
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    insertGridData,
    findOneByBotName,
    findAllGridData,
    updateGridData,
    deleteGridData,
    // Add other exported functions for CRUD operations
};

