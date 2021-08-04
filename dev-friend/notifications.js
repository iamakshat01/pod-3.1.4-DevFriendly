const vscode = require('vscode');
const motivate = require('inspirational-quotes');

const hydratedTask = () =>  {
    vscode.window.showInformationMessage(`Drink some water and get hydrated!\n ${motivate.getRandomQuote().text} \n -${motivate.getRandomQuote().author}`);
}

const restTask = () =>  {
    vscode.window.showInformationMessage(`Have A Break And Take Rest!\n ${motivate.getRandomQuote().text} \n -${motivate.getRandomQuote().author}`);
}

module.exports = { hydratedTask, restTask};