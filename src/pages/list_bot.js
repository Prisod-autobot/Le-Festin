const { findAllBotData } = require('../controller/botController.js');

document.addEventListener("DOMContentLoaded", async () => {
    const botData = await findAllBotData();
    console.log(botData);
    try {
        const tableBody = document.querySelector("#bot-table tbody");

        tableBody.innerHTML = "";

        botData.forEach((bot) => {
            const row = tableBody.insertRow();

            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);

            cell1.textContent = bot.type_id;
            cell2.textContent = bot.type_bot;
            cell3.textContent = bot.bot_name;
            cell4.textContent = bot.status;
            cell5.textContent = bot.pair;
            cell6.textContent = bot.exchange_name;
            cell7.textContent = bot.budget;

            // Create a button element
            const button = document.createElement("button");
            button.textContent = "Details";
            button.addEventListener("click", () => {
                window.location.href = `./grid_bot_detail.html?botName=${bot.bot_name}`;
            });

            cell8.appendChild(button);
        });
    } catch (error) {
        console.error(error);
    }
});
