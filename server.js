'use strict';

var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var routes = require('/app/routes/index.js');
var api = require('/app/api/url-shortener.js');
require('dotenv').config({
  silent: true
});
var url = "mongodb://harshad.erande:India2018@ds237660.mlab.com:37660/learnyoumongo";
    //'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
    //'mongodb://localhost:27017/url-shortener';

var app = express();
mongo.MongoClient.connect(url, function(err, db) {
//var myDB = database.db(process.env.DB);
  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }

  // The format follows as, alias to use for real path, also allows permission to such path.

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  db.createCollection("sites", {
    capped: true,
    size: 5242880,
    max: 5000
  });

  routes(app, db);
  api(app, db);
  db.close();
  var port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });

});