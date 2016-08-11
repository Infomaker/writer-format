'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Validator = require('./validator');

app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function() {
    next();
  });
});

app.use(bodyParser.urlencoded({extended: false}));

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/validation/newsitem', function(req, res) {
  var xml = req.rawBody;
  new Validator().validate(xml, function(error, validXml) {
    if (error) {
      console.log('Validation failed');
      if (validXml) {
        toJsonError(error, function(jsonError) {
          res.status(422).send({error: jsonError});
        });
      }
      else {
        res.status(500).send({error: error});
      }
    }
    else {
      console.log('Validation succeeded');
      res.send('NewsItem valid!');
    }
  });
});

var toJsonError = function(validationErrors, callback) {
  var jsonErrMsg = JSON.parse('{\"errors\": []}');
  if (Array.isArray(validationErrors)) {
    for (var i = 0; i < validationErrors.length; i++) {
      var msg = validationErrors[i] + '';
      jsonErrMsg.errors.push(JSON.stringify(msg));
    }
  }
  else {
    jsonErrMsg.errors.push(validationErrors + '');
  }
  callback(jsonErrMsg);
};

app.listen(8082, function() {
  console.log('Validation service listening on port 8082');
});
