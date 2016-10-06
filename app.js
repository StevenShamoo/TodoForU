var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var mongodb = require('mongodb');
var monk = require('monk');

// This is kind of cheating as I'm only checking to see if a PORT is
//  provided to us in the node env, but it should illustrate the point...
if (process.env.PORT) {
  var db = monk('localhost:27017/todoforu');
} else {
  var db = monk('localhost/todoforu');
}
// When I used heroku, I believe I put the heroku url in an env variable
//  for the app on heroku, so I would have checked for that (and used
//  it if I found it) instead of checking the PORT. However, you'll find
//  that as you build out your apps, you'll have more and more setup that
//  relies on the environment in which he app is running. For that reason,
//  it is probably worth checking out an environment management package, or
//  setting up a config json file (that is in the gitignore) and passing it
//  to some configEnv function that runs when you start up your server.

var index = require('./routes/index');

var port = process.env.PORT || 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(function(req, res, next){
  req.db = db;
  next();
});

app.use('/', index);



app.listen(port);



module.exports = app;
