const vscode = require('vscode');

class DataProvider {
  constructor(timer,userData) {
    
    this.users = [
      {
        first: "Today",
        position: { Hours: timer.time().h, Minutes: timer.time().m },
      },
      {
        first: "Yesterday",
        position: { Hours: userData.h, Minutes: userData.m },
      },
    ];
    this.userTreeItems = this.convertUsersToTreeItems();
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (element) {
      return element.getPositionDetails();
    } else {
      return this.userTreeItems;
    }
  }

  convertUsersToTreeItems() {
    let array = [];
    this.users.forEach((element) => {
      array.push(
        new UserTreeItem(element, vscode.TreeItemCollapsibleState.Expanded)
      );
    });
    return array;
  }

 
}

class UserTreeItem {
  // we must provide the property label for it to show up the tree view
  constructor(user, collapsibleState) {
    this.user = user;
    this.label = `${user.first}`;
    this.collapsibleState = collapsibleState;
    this.positionDetails = [];

    this.convertPositionToTreeItems();
  }

  // Convert each property in user.position to a TreeItem which is treated as child of the user tree item
  convertPositionToTreeItems() {
    if (this.user.position) {
      let prop1 = new vscode.TreeItem(
        `Hours: ${this.user.position.Hours}`
      );
      let prop2 = new vscode.TreeItem(
        `Mintues: ${this.user.position.Minutes}`
      );
      this.positionDetails = [prop1, prop2];
    }
  }

  getPositionDetails() {
    return this.positionDetails;
  }
}

module.exports = DataProvider;