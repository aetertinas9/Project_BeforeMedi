var express = require('express');
var router = express.Router();

var models = require('../../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  models.prediagnosis.findAll(
    {
      where: { uid: '1' },
      attributes: ['createdAt','systoleBloodPressure','diastoleBloodPressure']
    }).then(function(results) {
      res.json(results);
      //console.log(results);
  }).catch(function(err) {
      //TODO: error handling
  });
});


router.post('/', function(req, res) {
  models.prediagnosis.findAll(
    {
      where: { uid: '1' },
        attributes: ['createdAt','systoleBloodPressure','diastoleBloodPressure']

    }).then(function(results) {
      res.json(results);
      //console.log(results);
  }).catch(function(err) {
      //TODO: error handling
  });

});



module.exports = router;
