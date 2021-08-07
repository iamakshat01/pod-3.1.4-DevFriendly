const updateLocalStorage = (context, timer) => {
    let d = new Date();
    let curDate = d.toDateString();
    let oldTime = context.globalState.get(curDate); 
    if (oldTime === undefined) {
        context.globalState.update(curDate, timer.time());
    } else {
        let updatedTime = addTimes(oldTime, timer.time()) 
        context.globalState.update(curDate, updatedTime);
    }
}

const addTimes = (t1, t2) => {
    let carry = 0; 
    t1.ms += t2.ms; 
    if (t1.ms >= 1000) {
        carry += 1; 
        t1.ms -= 1000; 
    }
    t1.s += (t2.s + carry);
    carry = 0; 
    if (t1.s >= 60) {
        carry += 1;
        t1.s -= 60; 
    }
    t1.m += (t2.m + carry);
    carry = 0; 
    if (t1.m >= 60) {
        carry += 1; 
        t1.m -= 60; 
    }
    t1.h += (t2.h + carry);
    carry = 0; 
    if (t1.h >= 24) {
        carry += 1; 
        t1.h -= 24; 
    }
    t1.d += (t2.d + carry); 
    return t1; 
}
 
module.exports = {updateLocalStorage};