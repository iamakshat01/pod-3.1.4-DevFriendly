const updateLocalStorage = (context, timer) => {
    let d = new Date();
    let curDate = d.toDateString();
    
    context.globalState.update(curDate, timer.time());
}
 
 module.exports = {updateLocalStorage};