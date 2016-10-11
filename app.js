var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var mongodb = require('mongodb');
var monk = require('monk');


if (process.env.MONGODB_URI) {
  var db = monk(process.env.MONGODB_URI); // this is going to be whatever static address that mongolabs gives me
}else {
  var db = monk('localhost/todoforu');
}

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
