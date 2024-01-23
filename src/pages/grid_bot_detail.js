const { findOneByBotName, deleteBotData, updateBotData } = require('../controller/botController.js');
const { deleteGridData } = require('../controller/gridController.js');

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const botName = urlParams.get('botName');

    const bot = await findOneByBotName(botName);
    const set_value = bot.dataValues;

    document.getElementById('type_id').textContent = `Type Bot ID: ${set_value.type_id} ${set_value.id}`;
    document.getElementById('type_bot').textContent = `Type Bot: ${set_value.type_bot}`;
    document.getElementById('bot_name').textContent = `Bot Name: ${set_value.bot_name}`;
    document.getElementById('status').textContent = `Status: ${set_value.status}`;
    document.getElementById('pair').textContent = `Pair: ${set_value.pair}`;
    document.getElementById('exchange_name').textContent = `Exchange Name: ${set_value.exchange_name}`;
    document.getElementById('budget').textContent = `Budget: ${set_value.budget}`;

    // Button event listeners
    if (set_value.status === true) {
        document.getElementById('startButton').textContent = "Stop";
        document.getElementById('startButton').addEventListener('click', () => stopBot(set_value.bot_name));
    } else {
        document.getElementById('startButton').textContent = "Start";
        document.getElementById('startButton').addEventListener('click', () => startBot(set_value.bot_name));
    }
    document.getElementById('deleteButton').addEventListener('click', () => deleteBotHandler(set_value.bot_name));
});


async function startBot(name) {
    const updatedBotData = {
        status: true,
    };
    try {
        await updateBotData(name, updatedBotData);

        const bot = await findOneByBotName(name);
        const set_value = await bot.dataValues;
        document.getElementById('startButton').textContent = "Stop";
        document.getElementById('status').textContent = `Status: ${set_value.status}`;
    } catch (error) {
        console.error('Error  bot:', error);
    }
}

async function stopBot(name) {
    const updatedBotData = {
        status: false,
    };
    try {
        await updateBotData(name, updatedBotData);

        const bot = await findOneByBotName(name);
        const set_value = await bot.dataValues;
        document.getElementById('startButton').textContent = "Start";
        document.getElementById('status').textContent = `Status: ${set_value.status}`;
    } catch (error) {
        console.error('Error  bot:', error);
    }
}

async function deleteBotHandler(name) {
    try {
        await deleteBotData(name);
        await deleteGridData(name);
        window.location.href = ('./list_bot.html');
    } catch (error) {
        console.error('Error deleting bot:', error);
        alert('Error deleting bot. Please try again.');
    }
}