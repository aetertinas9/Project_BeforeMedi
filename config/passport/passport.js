
  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          console.log('serialize User')
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          console.log('deserialize User')
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(

    {
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){


      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        return done(null, false, {message : '이미 가입하였습니다'} );
      }

      else
      {
        var userPassword = generateHash(password);
        var data =
        { email:email,
        password:userPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
        };
        var pw={
          email:email,
          password:userPassword,
          name: req.body.firstname
        };

        User.create(data).then(function(newUser,created){
          if(!newUser){
            return done(null,false);

          }

          if(newUser){
            console.log(pw);
            return done(null,newUser);

          }


        });
      }


    });



  }



  ));

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(

  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {

      if (!user) {
        return done(null, false, { message: '이메일이 존재하지 않습니다' });
      }

      if (!isValidPassword(user.password,password)) {

        return done(null, false, { message: '비밀번호가 틀립니다' });

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: '로그인 실패' });


    });

  }
  ));

  }
