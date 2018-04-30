var express = require('express');
var router = express.Router();
var calendar = require('./../public/module/calModule_hbs');
//Data
//var myJson = require('./../public/json/act.json');
var actJson = './public/json/test.json';//data for exercise
var fs = require('fs');

//TODO
//1. Save to different files
//2. Delete/ Edit
//3. Edit page

/*
 * Pages
 */
/* GET calendar page. */
router.get('/', function(req, res, next) {
   res.render('calendar',{title:'Post'});

});


//Get
router.get('/get', function(req, res, next) {
    res.render('calendarGet',{title:'Select year'});
    //res.send(req.params)
});
router.get('/get/:year', function(req, res, next) {
    fs.readFile(actJson, 'utf-8', function(err, data) {
        var finalData = {
            data:JSON.parse(data),
            params:req.params
        }
        res.render('calendarGet',finalData);
    });
});

router.get('/get/:year/:month', function(req, res, next) {
    fs.readFile(actJson, 'utf-8', function(err, data) {
        var finalData = {
            data:JSON.parse(data),
            params:req.params
        }
        res.render('calendarGet',finalData);
    });
    //res.send(req.params)
});

//Post
router.post('/post', function(req, res) {
    var workpoutData = {
        "year":req.body.year,
        "month":req.body.month,
        "day":req.body.day,
        "note":req.body.note
    }
    

    fs.readFile(actJson, 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        console.log(arrayOfObjects);
        delete workpoutData._locals; //Not sure why property "_locals" shows
        arrayOfObjects.data.push(workpoutData)
        
        fs.writeFile(actJson, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })

        res.redirect('/calendar/get/'+workpoutData.year+'/'+workpoutData.month);
    })

    //res.render('calendarPost',workpoutData);

    

});
module.exports = router;


