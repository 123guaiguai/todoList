function flatList(List){
    var tempList = [];
    for (let i = 0; i < List.length; i++) {
        for (let j = 0; j < List[i].length; j++) {
            tempList.push(List[i][j]);
        }
    }
    return tempList;
}
function sliceList(tempList) {
    var page = Math.floor(tempList.length / 4);
    if (tempList.length % 4) {
        page += 1;
    }
    if(page===0){
        return [[]];
    }
    let newList = [];
    for (let i = 0; i < page; i++) {
        newList.push([]);
    }
    for (let j = 0; j < tempList.length; j++) {
        newList[Math.floor(j / 4)].push(tempList[j]);
    }
    //console.log(newList);
    return newList;
}
function sortedList(List) {
    var tempList =flatList(List);
    tempList.sort(compareTime);
    //console.log(tempList);
    let result = sliceList(tempList);
    // console.log('sortList:');
    // console.log(result);
    return result;
}
function compareTime(o1, o2) {//在sort函数中传入的参数
    var d1=o1.time;
    var d2=o2.time;
    var d1year = parseInt(d1.slice(0, 4));
    var d1month = parseInt(d1.slice(5, 7));
    var d1day = parseInt(d1.slice(8, 10));
    var d2year = parseInt(d2.slice(0, 4));
    var d2month = parseInt(d2.slice(5, 7));
    var d2day = parseInt(d2.slice(8, 10));
    if (d1year * 365 + d1month * 31 + d1day < d2year * 365 + d2month * 31 + d2day) {
        return -1;
    }
    else if(d1year * 365 + d1month * 31 + d1day > d2year * 365 + d2month * 31 + d2day){
        return 1;
    }
    else return 0;
}
function doneList(List) {
    var tempList = flatList(List);
    tempList = tempList.filter(item => {
        return item.done;
    })
    let result = sliceList(tempList);
    // console.log('doneList:');
    // console.log(result);
    return result;
}
function doingList(List) {
    var tempList = flatList(List);
    tempList = tempList.filter(item => {
        return !item.done;
    })
    let result = sliceList(tempList);
    return result;
    // console.log('doingList:');
    // console.log(result);
}
export {
    sortedList,
    doneList,
    doingList,
    sliceList,
    flatList
}