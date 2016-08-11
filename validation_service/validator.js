'use strict';

var xpath = require('xpath');

var DOMParser = require('xmldom').DOMParser;
var ParseXMLString = require('xml2js').parseString;

var SchemaValidator = require('./validator/schema_validator');
var NewsItemValidator = require('./validator/newsitem_validator');

var IPTC_NAMESPACE = 'http://iptc.org/std/nar/2006-10-01/';
var XPATH_NEWSITEM = '//newsml:newsItem';
var XSD_IM_NEWSML = './xsd/Infomaker-NewsItem_ver1.0.xsd';

class Validator {
  validate(xml, callback) {
    try {
      // Sanity check - is xml at all?
      ParseXMLString(xml, function(err, result) {
        if (err) {
          callback('Invalid XML!');
        }
        else if (!result) {
          callback('Missing XML!');
        }
        else {
          // Start validating actual newsml
          var document = new DOMParser().parseFromString(xml);
          var select = xpath.useNamespaces({'newsml': IPTC_NAMESPACE});
          var nodes = select(XPATH_NEWSITEM, document);

          if (nodes && nodes.length > 0) {
            validateNewsItem(xml, function(err) {
              if (err) {
                callback(err, true);
              }
              else {
                callback(null, true);
              }
            })
          }
          else {
            callback('Failed to validate document. Unsupported mime-type');
          }
        }
      });
    }
    catch (exception) {
      callback(exception);
    }
  }
}

function validateNewsItem(xml, callback) {
  SchemaValidator.validate(xml, XSD_IM_NEWSML, function(err) {
    if (err) {
      callback(err);
    }
    else {
      new NewsItemValidator().validate(xml, function(err, result) {
        if (err) {
          callback(err);
        }
        else {
          if (result.length > 0) {
            callback(result);
          }
          else {
            callback();
          }
        }
      });
    }
  });
}

module.exports = Validator;