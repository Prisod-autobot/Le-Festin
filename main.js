const { app, BrowserWindow, ipcMain } = require("electron");
const db_connect = require("./src/config/db_conn");
const path = require("path");
const { insertGridData } = require('./src/controller/gridController');
const { insertGridBotData, findAllBotData } = require('./src/controller/botController');

require("./src/models/botModel");
require("./src/models/gridHistoryModel");
require("./src/models/gridModel");
require("./src/models/reBalanceHistoryModel");
require("./src/models/reBalanceModel");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("./src/index.html");

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

db_connect.sync({ force: false }).then(() => {
    console.log("Synchronize successfully");
});

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// Insert Data Grid
ipcMain.on("saveDataPage1", (event, data) => {
    global.page1Data = data;

    mainWindow.loadFile(path.join(__dirname, "./src/pages/grid/bot_config.html"));
});

ipcMain.on("saveDataPage2", async (event, data) => {
    const botConfigData = { ...global.page1Data, ...data };

    try {
        await insertGridData(botConfigData);
        await insertGridBotData(botConfigData);

        event.sender.send("saveDataSuccess", "Data saved successfully");
        mainWindow.loadFile(path.join(__dirname, "./src/pages/list_bot.html"));
    } catch (error) {
        console.error(error);
        event.sender.send("saveDataError", "Error saving data");
    }
});

//Show data In table


app.on("activate", function () {
    if (mainWindow === null) createWindow();
});

app.on("will-quit", function () {
    db_connect.close();
});
