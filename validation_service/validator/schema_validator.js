'use strict';

var xsd = require('libxml-xsd');

class SchemaValidator {
  static validate(xml, schemaPath, callback) {
    xsd.parseFile(schemaPath, function(err, schema) {
      if (err) {
        console.error(err);
        callback(err);
      }
      else {
        schema.validate(xml, function(err, validationErrors) {
          if (err) {
            callback(err);
          }
          else if (validationErrors) {
            callback(validationErrors);
          }
          else {
            callback();
          }
        });
      }
    });
  }
}

module.exports = SchemaValidator;
