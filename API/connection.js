const mongoose = require('mongoose');
mongoose.connect(' /* HERE YOU SHOULD WRITE THE URL OF YOUR MONGO DB, TO BE ABLE TO CONNECT WITH */', {useNewUrlParser: true, useUnifiedTopology: true});
const User = require('./models/user');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");


require('./config/passport')(passport);


var corsOptions = {
    origin: true,
    credentials: true };

app.use(cors(corsOptions));
app.use(cookieParser("secret"));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());




app.get("/isAuth", (req, res) => {   
  console.log("Inside isAuth");
  console.log(req.user);
  res.json(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


app.get("/logout", (req, res) => {   
  req.logout();
  res.json("logout")
});



  app.post('/getdata', function (req, res, next) {
    console.log("------------ Inside getdata ------");
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
        if (!user) {
          // *** Display message without using flash option
          // re-render the login form with a message
          return res.send({message: 'Failure'});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.send({message: 'Success'});
        });
      })(req, res, next);
    });


  app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname,'/form.html'));
  });



app.post('/senddata', function (req, res) {
console.log(req.body);

    var data1 = req.body.MMtext;


    User.findOne({email:'test@module.com'},(err,user) => {
        user.alerts.push(data1);
        user.save();
        });
    res.send('Hello World')
  });


app.listen(3001);

console.log("test logs");