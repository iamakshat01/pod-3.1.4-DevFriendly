const updateLocalStorage = (context, timer) => {
    let d=new Date();
    let curDate=d.toDateString();
    
    context.globalState.update(curDate, timer.time());
    
    
    console.log(timer.time());
    console.log(context.globalState.get(curDate));
 }
 
 module.exports = {updateLocalStorage};