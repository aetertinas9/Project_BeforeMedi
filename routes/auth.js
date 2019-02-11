var authController = require('../controllers/authcontroller.js');
var models = require('../models');
var express = require('express');
var passport = require('passport');

module.exports = function(app,passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/signin',
failureRedirect: '/signin'}));

app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/prediagnosis',
failureRedirect: '/signin'}));


app.get('/prediagnosis',isLoggedIn, authController.prediagnosis);

app.post('/prediagnosis',isLoggedIn,function(req, res) {


  models.prediagnosis.findOne({where:{id:req.body.id}})
                  .then(function(data)
                  {
                    if((data ==null || data == undefined) ===false ){
                        res.json({result:false, message:'이미 사용중입니다'})
                        res.redirect('/prediagnosis');
                    }

                    models.prediagnosis.create({
                      id:req.body.id,
                      uid:req.body.uid,
                      systoleBloodPressure:req.body.systoleBloodPressure,
                      diastoleBloodPressure:req.body.diastoleBloodPressure,
                      bloodGlucose:req.body.bloodGlucose,
                      pregnant: req.body.pregnant,
                  		takemedicine:req.body.takemedicine
                    })
                    .then(function(createdUserCore)
                  {
                    //res.json({result:true,message:'정상 등록되었습니다'})
                    res.redirect('/dashboard');
                  });

        });
});
app.get('/dashboard',isLoggedIn, authController.dashboard);



app.get('/logout',authController.logout);





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}
