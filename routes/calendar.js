var express = require('express');
var router = express.Router();


var calendar = require('./../public/module/calModule_hbs');

/* GET calendar page. */
router.get('/', function(req, res, next) {
   //Data
   var myJson = require('./../public/json/act.json');

   res.render('calendar',myJson);
});

module.exports = router;


