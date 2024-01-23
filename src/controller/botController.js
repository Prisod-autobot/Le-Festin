const BotModel = require('../models/botModel.js');

async function insertGridBotData(botConfigData) {
    const existingBot = await BotModel.findOne({
        where: { bot_name: botConfigData.botName }
    });

    if (existingBot) {
        console.error(`Bot with name '${botConfigData.botName}' already exists.`);
        return null;
    }

    const gridConfig = {
        type_id: "G-",
        type_bot: botConfigData.grid_id,
        bot_name: botConfigData.botName,
        status: false,
        api_key: botConfigData.apiKey,
        api_secret: botConfigData.secretKey,
        pair: botConfigData.pair,
        exchange_name: botConfigData.exchangeName,
        budget: parseFloat(botConfigData.budget),
    };
    try {
        const result = await BotModel.create(gridConfig);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function findOneByBotName(botName) {
    try {
        const bot = await BotModel.findOne({
            where: { bot_name: botName }
        });
        return bot;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function findAllBotData() {
    try {
        const allBotData = await BotModel.findAll({
            attributes: {
                exclude: ['api_key', 'api_secret', 'up_zone', 'low_zone', 'grid_quantity', 'grid_step', 'zone_calculator']
            }
        });
        return allBotData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateBotData(botName, updatedData) {
    try {
        const [updatedRowsCount, updatedRows] = await BotModel.update(updatedData, {
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

async function deleteBotData(botName) {
    try {
        const deletedRowCount = await BotModel.destroy({
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
    insertGridBotData,
    findOneByBotName,
    findAllBotData,
    updateBotData,
    deleteBotData,
    // Add other exported functions for CRUD operations
};
