const vscode = require('vscode');

const hydratedTask = () =>  {
    vscode.window.showInformationMessage('Drink some water and get hydrated!');
}

const restTask = () =>  {
    vscode.window.showInformationMessage('Have A Break And Take Rest!');
}

module.exports = { hydratedTask, restTask};