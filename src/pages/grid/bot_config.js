const { ipcRenderer } = require('electron');

document.getElementById('configForm').addEventListener('submit', function (event) {
    event.preventDefault();
    saveData();
});

function saveData() {
    const botName = document.getElementById('botName').value;
    const upZone = document.getElementById('upZone').value;
    const lowZone = document.getElementById('lowZone').value;
    const gridQuantity = document.getElementById('gridQuantity').value;
    const gridStep = document.getElementById('gridStep').value;
    const pair = document.getElementById('pair').value;

    // Basic validation
    if (!botName || !upZone || !lowZone || !gridQuantity || !gridStep || !pair) {
        alert('Please fill in all fields');
        return;
    }

    // Sending data to main process
    ipcRenderer.send('saveDataPage2', { botName, upZone, lowZone, gridQuantity, gridStep, pair });
}
