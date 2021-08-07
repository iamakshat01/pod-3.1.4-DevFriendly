const vscode = require('vscode');
const motivate = require('inspirational-quotes');

const hydratedTask = () =>  {
    vscode.window.showInformationMessage(`Drink some water and get hydrated!`);
    vscode.window.showInformationMessage(`${motivate.getRandomQuote()}`);
}

const restTask = () =>  {
    vscode.window.showInformationMessage(`Have A Break And Take Rest!`);
    vscode.window.showInformationMessage(`${motivate.getRandomQuote()}`);
}

module.exports = { hydratedTask, restTask};