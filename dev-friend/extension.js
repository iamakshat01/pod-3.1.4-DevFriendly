// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { Timer } = require('timer-node'); 
const { hydratedTask, restTask } = require('./notifications');
const { updateLocalStorage } = require('./localStore');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const timer = new Timer();

function activate(context) {

    const helloWorldId = 'dev-friend.helloWorld'; 
	const startTimerId = 'dev-friend.startTimer'; 
    const pauseTimerId = 'dev-friend.pauseTimer'; 

    context.subscriptions.push(vscode.commands.registerCommand(helloWorldId, () => {
        vscode.window.showInformationMessage('Hello world!');
        console.log(context.globalState["_value"]["Mon Aug 02 2021"]); 
    }));

    context.subscriptions.push(vscode.commands.registerCommand(startTimerId, () => {
        vscode.window.showInformationMessage('Timer started!');
        if (timer.isStarted()) {
            timer.resume(); 
            this.hydrate = setInterval(hydratedTask, 1800000);
            this.rest = setInterval(restTask, 3000000);
        } else {
            timer.start(); 
            this.hydrate = setInterval(hydratedTask, 1800000);
            this.rest = setInterval(restTask, 3000000);
        }
        updateStartButton(); 
        setInterval(updateCurrentTime, 100);
    }));

    context.subscriptions.push(vscode.commands.registerCommand(pauseTimerId, () => {
        vscode.window.showInformationMessage('Timer paused!');
        timer.pause();
        clearInterval(this.hydrate);
        clearInterval(this.rest);
        updatePauseButton(); 
        updateLocalStorage(context, timer);
    }));

    currentTime = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 20);
    currentTime.text = "00:00:00";

    startTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    startTimer.command = startTimerId;
    startTimer.text = "Start"; 

    pauseTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    pauseTimer.command = pauseTimerId;
    pauseTimer.text = "Pause"; 

    context.subscriptions.push([currentTime, startTimer, pauseTimer]);

    currentTime.show(); 
    startTimer.show(); 

}

const updateStartButton = () => {
    startTimer.hide(); 
    pauseTimer.show(); 
}

const updatePauseButton = () => {
    startTimer.show();
    pauseTimer.hide(); 
}

const updateCurrentTime = () => {
    currentTime.text = (timer.time().h < 10 ? "0" : "") + timer.time().h.toString() 
    + (timer.time().m < 10 ? ":0" : ":") + timer.time().m.toString() 
    + (timer.time().s < 10 ? ":0" : ":") + timer.time().s.toString(); 
}



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
