var express = require('express');
var router = express.Router();
var request = require('request');
//var calendar = require('./../public/module/calModule_hbs');
//Data
//var myJson = require('./../public/json/act.json');
var actJson = './public/json/apitest.json';//data for exercise
var fs = require('fs');

/*
 * All API test
 * 
*/

//http://localhost:3000/api/
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

/*router.param('user_id', function(req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.user = {
      id: id,
      name: 'TJ'
    };
    next();
  });*/

router.route('/:year/:month/:day')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(function(req, res, next) {
    //res.json(req.user);
    fs.readFile(actJson, 'utf-8', function(err, data) {
        var finalData = {
            data:JSON.parse(data),
            params:req.params
        }
        res.json(finalData.data);
    });
  })
  .put(function(req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(function(req, res, next) {
    //next(new Error('not implemented'));
    var workpoutData = {
        "id":111,
        "year":req.params.year,
        "month":req.params.month,
        "day":req.params.day,
        "note":"Run"
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

        res.json(arrayOfObjects.data);
    })
  })
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  });

  router.route('/:year/:month/:day/:id')
  .delete(function(req, res, next) {
    //next(new Error('not implemented'));

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

        res.json(arrayOfObjects.data);
    })
  });

//Test api call
router.get('/delete', function(req, res) {
    res.json({ message: 'delete' });   
});

router.get('/delete/:year/:month/:day/:id', function(req, res) { 
   // if (!req.params.id) { 
        //res.json({ message: 'delete 2' }); 
        //res.status(500); 
        //res.send({"Error": "Looks like you are not senging the product id to get the product details."}); 
        //console.log("Looks like you are not senging the product id to get the product detsails."); 
    //} 
    var cUrl = "http://localhost:3000/api/" + req.params.year+"/"+ req.params.month+"/"+ req.params.day+"/"+ req.params.id;
    request.delete(
        { 
            url: cUrl,
        },function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            res.json(response.body); 
        } 
    }); 
}); 

module.exports = router;



