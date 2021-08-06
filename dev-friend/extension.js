// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { Timer } = require('timer-node'); 
const { hydratedTask, restTask } = require('./notifications');
const { updateLocalStorage } = require('./localStore');
const DataProvider = require("./dataProvider.js");
const view = require("./view");
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
    const resetTimerId = 'dev-friend.resetTimer';

    context.subscriptions.push(vscode.commands.registerCommand(helloWorldId, () => {
        vscode.window.showInformationMessage('Hello world!');
        this.userData=prevData(context);
        setTimeout(updateSideBar,1000,this.userData); 
        }));

    context.subscriptions.push(vscode.commands.registerCommand(startTimerId, () => {
        vscode.window.showInformationMessage('Timer started!');
        if (timer.isStarted()) {
            timer.resume(); 
            this.hydrate = setInterval(hydratedTask, 1800000);
            this.rest = setInterval(restTask, 3000000);
        } else {
            timer.start();
            this.userData=prevData(context);
            setTimeout(updateSideBar,1000,this.userData);
            this.hydrate = setInterval(hydratedTask, 1800000);
            this.rest = setInterval(restTask, 3000000);
        }
        updateStartButton(); 
        setInterval(updateCurrentTime, 100);
        this.sidebar = setInterval(updateSideBar,60000,this.userData)
    }));

    context.subscriptions.push(vscode.commands.registerCommand(pauseTimerId, () => {
        vscode.window.showInformationMessage('Timer paused!');
        timer.pause();
        clearInterval(this.hydrate);
        clearInterval(this.rest);
        clearInterval(this.sidebar);
        updatePauseButton(); 
        updateLocalStorage(context, timer);
    }));

    context.subscriptions.push(vscode.commands.registerCommand(resetTimerId, () => {
        if (!timer.isPaused()) {
            updateLocalStorage(context, timer); 
        }
        vscode.window.showInformationMessage('Timer reset!');
        timer.pause();
        clearInterval(this.hydrate);
        clearInterval(this.rest);
        clearInterval(this.sidebar);
        timer.clear();
        updatePauseButton();
   }));

    currentTime = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 20);
    currentTime.text = "00:00:00";

    startTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    startTimer.command = startTimerId;
    startTimer.text = "Start"; 

    pauseTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    pauseTimer.command = pauseTimerId;
    pauseTimer.text = "Pause"; 

    resetTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    resetTimer.command = resetTimerId;
    resetTimer.text = "Reset";

    context.subscriptions.push([currentTime, startTimer, pauseTimer, resetTimer]);

    currentTime.show(); 
    startTimer.show();
    
    const commmandID = "memes.show";

    context.subscriptions.push(
      vscode.commands.registerCommand(commmandID, () => {
        view.show(context);
      })
    );

    memes = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 15);
    memes.text = "Memes";
    memes.command = commmandID;

    memes.show();
}

const updateStartButton = () => {
    startTimer.hide(); 
    pauseTimer.show(); 
    resetTimer.show();
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

const updateSideBar = (userData) => {
    let myData = new DataProvider(timer,userData);
    let view = vscode.window.createTreeView("stats", {
        treeDataProvider: myData,
    });
    context.subscriptions.push(view);
}

const prevData = (context) => {
    let arr = []; 
    let today = new Date();
    let yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);
    arr.push(context.globalState.get(today.toDateString()));
    arr.push(context.globalState.get(yesterday.toDateString()))

    return arr;
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
