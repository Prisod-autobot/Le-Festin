const { ipcRenderer } = require('electron');

document.getElementById('configForm').addEventListener('submit', function (event) {
    event.preventDefault();
    saveData();
});

function saveData() {
    const apiKey = document.getElementById('apiKey').value;
    const secretKey = document.getElementById('secretKey').value;
    const exchangeName = document.getElementById('exchangeName').value;
    const zoneCalculator = document.getElementById('zoneCalculator').value;
    const budget = document.getElementById('budget').value;
    const amount = document.getElementById('amount').value;
    const grid_id = ("Grid");

    // Basic validation
    if (!apiKey || !secretKey || !exchangeName || !zoneCalculator || !budget || !amount || !grid_id) {
        alert('Please fill in all fields');
        return;
    }

    // Sending data to the main process
    ipcRenderer.send('saveDataPage1', { apiKey, secretKey, exchangeName, zoneCalculator, budget, amount, grid_id });
}

