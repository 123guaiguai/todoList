function checkTime(year,month,day){
    var Year=parseInt(year);
    var Month=parseInt(month);
    var Day=parseInt(day);
    if(Year<0||(Month<0||Month>12)||(Day<0||Day>31)){
        alert("输入日期不合法！");
        return false;
    }
    if(Year.toString().length>4){
        alert("输入日期不合法！");
        return false;
    }
    var d=new Date();
    var nowyear=d.getFullYear();
    var nowmonth=d.getMonth()+1;
    var nowdate=d.getDate();
    if(Year*365+Month*31+Day<nowyear*365+nowmonth*31+nowdate){
        alert("设定的日期已过！");
        return false;
    }
    return true;
}
function pieceTime(year,month,day){
    if(month.length===1){
        month='0'+month;
    }
    if(day.length===1){
        day="0"+day;
    }
    return `${year}年${month}月${day}日`;
}
export{
    checkTime,
    pieceTime,
}