var express = require('express');

var router = express.Router();



var todo = 'Welcome to TodoForU, here is your current todo list. '  +
'If you would like to add a task, click on the link above. ' +
'If you would like to delete or update a task please use the buttons below on the data table.' +
'WARNING: The Database will wipe everytime you leave the site, this was necessary for maintenance of the site.'

var todoadd = 'This tab is for adding new tasks.  When you are done ' +
'click the Add Task button and it will add it to your current todo list.'

router.get('/', function(req, res){
  res.render('index', { todop : todo, todopadd: todoadd});
})


router.delete('/wipeTasks', function(req, res) {
  var db = req.db;
  var collection = db.get('tasklist');
  collection.remove({}, function(err, results) {
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    )
  })
})

router.get('/filltable', function(req, res){
  var db = req.db;
  var collection = db.get('tasklist');
  collection.find({}, function(err, docs){
    res.json(docs);
  })
})


router.post('/addtask', function(req, res) {
  var db = req.db;
  var collection = db.get('tasklist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
      )
  })
})


router.delete('/deletetask/:id', function(req, res){
  var db = req.db;
  var collection = db.get('tasklist');
  var idUse = req.params.id;
  collection.remove({'_id': idUse}, function(err, results){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    )
  });
})

router.get('/makeupdatemodal/:id', function(req, res){
  var db = req.db;
  var collection = db.get('tasklist');
  var idUse = req.params.id;
  collection.find({'_id': idUse},function(err, data){
    res.json(data);
  })
})

router.post('/updatetask/:id', function(req, res){
  var db = req.db;
  var collection = db.get('tasklist');
  var idUse = req.params.id;
  collection.update({'_id': idUse}, req.body, function(err, results){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    )
  })
})

module.exports = router;
