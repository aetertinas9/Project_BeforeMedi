var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var prediagnosisRouter = require('./routes/prediagnosis');
//
var dashboardRouter = require('./routes/dashboard/1');
var dashboardRouter2 = require('./routes/dashboard/2');
//
var app = express();


var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env        = require('dotenv').load()
var exphbs     = require('express-handlebars')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/prediagnosis',prediagnosisRouter);
//
app.use('/dashboard/1',dashboardRouter);
app.use('/dashboard/2',dashboardRouter2);
//

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 // For Passport
app.use(session({ secret: 'honey bee',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

  //Models
  var models = require("./models");

  //Routes
  var authRoute = require('./routes/auth.js')(app,passport);


  //load passport strategies
  require('./config/passport/passport.js')(passport,models.user);


  //Sync Database
  models.sequelize.sync().then(function(){
  console.log('Database is connected')

  }).catch(function(err){
  console.log(err,"Something went wrong with the Database Update!")
  });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
