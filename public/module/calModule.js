
var module = (function(){
  var dayArr = ['Sun', 'Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat'];

  var getDay = function(year, month, date){
      var d = new Date(year, month, date);
      return dayArr[d.getDay()];
  } 
    
   


//-----

  var listDaysofMonth = function(year, month){
    var days = '';
    for (var d=1; d<Number(daysofMonth(year,month)); d++){
        days += getDay(year, month, d) + ',';
    }
    return days;
  }
  //When insert, year, month, it will show how many days
  //ex:2018,1 => daysofMonth(2018, 1)
  var daysofMonth = function(year, month){
    //** consider error
    var days = new Date(year, month, 0).getDate();
    return days;
  }

  /*var restDaysFromLastMonth = function(year, month, date){
     var restDays = [];
     var d = new Date(year, month, date);
     
     if (date==1){
          var s = daysofMonth(year,(month-1))-Number(d.getDay())+1;
          var e = daysofMonth(year,(month-1));
          //console.log(s+'-'+e);
         for (var x = s; x <= e; x++ ) {
             restDays.push(x);
         } 

     } else {
         for (var y = 1; y < (7 - Number(d.getDay())) ; y++ ) {
             restDays.push(y);
         }       
     }

     return restDays+(date==1?',':'');
  }*/
  //When insert year, month, date, it will convert to day index
  // Sun - 0, Mon - 1, ..
  var getDayIndex = function(year, month, date){
      //** consider error
      var d = new Date(year, month-1, date);
      return d.getDay();
  }
  //List days from previous months from current month
  //date will be first date of month or last date of month
  var listDaysBesidesCurMonth = function(year,month, date){
    var dates = '';
    var days = Number(daysofMonth(year,month));
    var firstDayofMonth = getDayIndex(year, month, date);
    var lastDayofMonth = getDayIndex(year, month, days);

    if(firstDayofMonth!=0 && date == 1){ //When first day of month is not Sun
        if(month-1==0){
          var daysofLastMonth = daysofMonth(year-1,12);//ex:2018,2 =>Last month is 1, so should be 31
          //console.log(daysofLastMonth);
        } else {
          var daysofLastMonth = daysofMonth(year,month-1);//ex:2018,2 =>Last month is 1, so should be 31
        }
        var lastDaysofLastMonth = getDayIndex(year, month, date);
        //console.log(lastDaysofLastMonth)//ex:2018,2,1 ; Last days of Jan is 28,29,30,31; 7 -
        var firstDayofLastDays = daysofLastMonth - (lastDaysofLastMonth-1);//ex:shoudld 28 = 31 -3
        
        //console.log(firstDayofLastDays +'-'+daysofLastMonth);
        for(var b=firstDayofLastDays; b<=daysofLastMonth; b++){
            dates += dayCompHtml(year,month,b,false);
        }
    }
    if(lastDayofMonth!=0 && date!=1){ //When first day of month is not Sun
      for(var a=1; a<(7-lastDayofMonth); a++){
            dates += dayCompHtml(year,month,a,false);
        }
    }

    return dates;
  }

  var dayComp = function(day, currentMonth){
    var dayArea = dateNumber(day, currentMonth); 
    return dayArea;
    
  }
  var dayCompHtml = function(year, month, day, currentMonth, actObj){
    var note = '';
    if (typeof actObj!='undefined') {
          var matchAct = actObj.filter(function(el){
              if (el.year == year && el.month == month && el.day == day){
                return el;
              }
          });
          if(matchAct.length!=0) {
            //console.log(matchAct[0].note);
            note = matchAct[0].note;
          }
          //
    }
    var dayAreaHtml = '<div class="daybox" >'+dayComp(day, currentMonth)+note+'</div>';
    return dayAreaHtml;
  } 
  /*****
  ****** Load json file and Insert to Calendar
  ******/
  //var test = function(){
//----- Promise and retrun data
/*var fs = require('fs');

  var getActJson = new Promise((resolve, reject) => {
    var obj = '';
    var json = '';
    fs.readFile('act.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            //obj.push({id: 2, square:3}); //add some data
            json = JSON.stringify(obj); //convert it back to json
            //fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
        }
    });
    // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
    // In this example, we use setTimeout(...) to simulate async code. 
    // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout(function(){
      resolve(obj); // Yay! Everything went well!
    }, 250);
  });

  getActJson.then((obj) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      //console.log(successMessage);
      insertActivities(obj);
  });
*/
  

  
//}

  var insertActivities = function(obj){
    return buildHtml(2018, obj);
    //return note;
  }


   
   //list all dates of month
   //When enter year, month, it will show all dates in that month
  var listDatesofMonth = function(year, month, obj){
    var dates = '';
        dates += (month==1?yearHeader(year):'') + monthHeader(month); //Show each month (When Jan, show year)

    var days = Number(daysofMonth(year,month));
    var firstDayofMonth = getDayIndex(year, month, 1);
    var lastDayofMonth = getDayIndex(year, month, days);

    dates += listDaysBesidesCurMonth(year, month, 1);

    for (var d=1; d<=days; d++){
        dates += dayCompHtml(year,month,d,true, obj)+(getDayIndex(year, month, d)==6?'<div style="clear:both;"></div>':'');
    }
    //first dates for next monts
    dates += listDaysBesidesCurMonth(year, month, days);
    return dates;
  }


  //create day component
  var dateNumber = function(day, currentMonth){
      return '<span style="text-align:center;'+(currentMonth?'font-weight:bold;opacity:1':'opacity:0.5')+'">'+day+'</span><br>';
  }
  var monthHeader = function(month){
    if(typeof month !='undefined' && (month>=1 && month<=12)) return '<div style="clear:both;"></div><center><h1>'+month+'</h1></center>';
  }
  var yearHeader = function(year){
      if(typeof year !='undefined') return ''+year+'';
  }

  /*********Build full calendar by month or year**********/
  var buildHtml = function(year, obj){
    var html = '';
    //html += '<!doctype html>\n<html lang="en">\n';
    //html += '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n';
    html += '<div id="content">';
    for (var c=1; c<=12;c++){
        html+=listDatesofMonth(year,c, obj);
    }
    html += '</div>';
    return html;
  }
  return {
    dayArr:dayArr,
    getDay:getDay,
    //dailyActivities:dailyActivities,
    listDaysofMonth:listDaysofMonth,
    daysofMonth:daysofMonth,
    //restDaysFromLastMonth:restDaysFromLastMonth,
    getDayIndex:getDayIndex,
    listDaysBesidesCurMonth:listDaysBesidesCurMonth,
    listDatesofMonth:listDatesofMonth,
    dayComp:dayComp,
    dayCompHtml:dayCompHtml,
    dateNumber:dateNumber,
    monthHeader:monthHeader,
    yearHeader:yearHeader,
    insertActivities:insertActivities,
    buildHtml:buildHtml//,
    //getActJson:getActJson
  }
}());

exports.module = module;


