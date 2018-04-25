var express = require('express');
var router = express.Router();
var calendar = require('./../public/module/calModule_hbs');
//Data
var myJson = require('./../public/json/act.json');
var myJson2 = require('./../public/json/test.json');
var fs = require('fs');


/*
 * Pages
 */
/* GET calendar page. */
router.get('/', function(req, res, next) {
   res.render('calendar',myJson);

});


//Get
router.get('/get', function(req, res, next) {
    res.render('calendarGet',{title:'Select year'});
    //res.send(req.params)
});
router.get('/get/:year', function(req, res, next) {
    var finalData = {
        data:myJson2,
        params:req.params
    }
    res.render('calendarGet',finalData);
    //res.send(finalData)
});

router.get('/get/:year/:month', function(req, res, next) {
    var finalData = {
        data:myJson2,
        params:req.params
    }
    res.render('calendarGet',finalData);
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
    

    fs.readFile('./public/json/test.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.data.push(workpoutData)
        fs.writeFile('./public/json/test.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })

    res.render('calendarPost',workpoutData);
    //res.send(workpoutData);

});
module.exports = router;


