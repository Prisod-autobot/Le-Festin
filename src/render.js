const { ipcRenderer } = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');

const { createRoot } = require('react-dom/client');
const App = require('./App.js');

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

