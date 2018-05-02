var express = require('express');
var router = express.Router();
var calendar = require('./../public/module/calModule_hbs');
//Request api
var request = require('request');
//file module
var fs = require('fs');
//Data file 
var actJson = './public/json/test.json';//data for exercise
//siteUrl
var siteUrl = 'http://localhost:3000';


//TODO
//1. Save to different files
//2. Delete/ Edit
//3. Edit page
/*
 * All API test
 * 
*/


/*
 * Pages
 */
/* GET calendar page. */
// Main page
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

router.get('/get/:year/:month/:day', function(req, res, next) {
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
        "id":req.body.id,
        "year":req.body.year,
        "month":req.body.month,
        "day":req.body.day,
        "note":req.body.note
    }
    

    fs.readFile(actJson, 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        
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

//Delete 
//router.delete TODO

router.get('/delete/:year/:month/:day/:id', function(req, res) {
    //res.send(req.params)
    /*
    fs.readFile(actJson, 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.data.find(function(e,i,a){
            if(e.id == req.params.id ){
                return a.splice(i,1)
            }
        })
        fs.writeFile(actJson, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })

        res.redirect('/calendar/get/'+req.params.year+'/'+req.params.month+'/'+req.params.day);
    })
    */
    //Use api call from test api
    var cUrl = siteUrl+"/calendar/api/" + req.params.year+"/"+ req.params.month+"/"+ req.params.day+"/"+ req.params.id;
    request.delete(
        { 
            url: cUrl,
        },function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            //res.json(response.body); 
            res.redirect('/calendar/get/'+req.params.year+'/'+req.params.month+'/'+req.params.day);
        } 
    }); 
});


module.exports = router;


