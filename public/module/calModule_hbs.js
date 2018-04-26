var calendar = require('./calModule');
var hbs = require('hbs');
var handlebarsLoop = require('handlebars-loop');

//convert all functions to helper func
hbs.registerHelper('getDay', calendar.module.getDay);//year, month, date
hbs.registerHelper('listDaysofMonth', calendar.module.listDaysofMonth);//year, month
hbs.registerHelper('daysofMonth', calendar.module.daysofMonth);//year, month
//hbs.registerHelper('restDaysFromLastMonth', calendar.module.restDaysFromLastMonth);//year, month, date
//hbs.registerHelper('getDayIndex', calendar.module.getDayIndex);//year, month, date
//hbs.registerHelper('listDaysBesidesCurMonth', calendar.module.listDaysBesidesCurMonth);//year, month, date
//hbs.registerHelper('dayComp', calendar.module.dayComp);//day, currentMonth
hbs.registerHelper('dayCompHtml', calendar.module.dayCompHtml);//year, month, day, currentMonth, actObj
hbs.registerHelper('insertActivities', calendar.module.insertActivities);//obj
hbs.registerHelper('listDatesofMonth', calendar.module.listDatesofMonth);//year, month, obj
hbs.registerHelper('dateNumber', calendar.module.dateNumber);//day, currentMonth
hbs.registerHelper('monthHeader', calendar.module.monthHeader);//month
hbs.registerHelper('yearHeader', calendar.module.yearHeader);//year
//hbs.registerHelper('buildHtml', calendar.module.buildHtml);//year, obj
//New func
hbs.registerHelper('buildFullMonth', function(year,month,actObj){
    var note = '';
    var dayAreaHtml = '';
    var days = calendar.module.daysofMonth(year,month);

    var firstDayofMonth = calendar.module.getDayIndex(year, month, 1);
    var lastDayofMonth = calendar.module.getDayIndex(year, month, days);

    if (typeof year != 'undefined' && typeof month!='undefined'){
        dayAreaHtml += calendar.module.monthHeader(month);
        dayAreaHtml += calendar.module.listDaysBesidesCurMonth(year, month, 1);

        for (var d=1; d<=days; d++){
            note = '';
            
            if (typeof actObj!='undefined') {
                var matchAct = actObj.filter(function(el){ //TODO: change to find
                    if (el.year == year && el.month == month && el.day == d){
                        
                      return el;
                    }
                });
                
                if(matchAct.length!=0) {
                    
                  note = matchAct[0].note;
                  
                }
            }
            dayAreaHtml += '<div style="float:left;width:13%;border:1px #333 solid;height:100px;" >'+calendar.module.dayComp(d, month) + '<span class="note">'+note+'</span>'+'</div>';
        }
    
        dayAreaHtml += calendar.module.listDaysBesidesCurMonth(year, month, days);
    }

    return dayAreaHtml;
});

//Genernal tool
hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 1; i <= n; ++i)
        accum += block.fn(i);
    return accum;
}); 
/*
{{#times 2}}
{{this}}
{{/times}}
*/
//Loop
hbs.registerHelper('loop', handlebarsLoop);
/*
{{#loop 0 5 1}}
<div>{{this}}</div>
{{/loop}}
*/
