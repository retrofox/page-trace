
/**
 * Module dependencies.
 */

var express = require('express');
var join = require('path').join;
var fs = require('fs');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.enable('strict routing');

/**
 * GET build.js
 */

app.get('/build.js', function(req, res){
  res.sendfile(join(__dirname, '../build', 'build.js'));
});

// routes

app.get('/:page?', function(req, res){
  res.render('index');
});

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);
console.log('Example server listening on port 3000');
