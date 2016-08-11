'use strict';

var xpath = require('xpath');
var DOMParser = require('xmldom').DOMParser;

var Promise = require('promise');

var XPATH_ITEM_META = '//newsml:itemMeta';
var XPATH_CONTENT_META = '//newsml:contentMeta';
var XPATH_ITEM_EXT_PROP_URI = '//newsml:itemMeta/newsml:itemMetaExtProperty[@type=\"imext:uri\"]';
var XPATH_VERSION_CREATED = '//newsml:itemMeta/newsml:versionCreated';
var XPATH_FIRST_CREATED = '//newsml:itemMeta/newsml:firstCreated';
var XPATH_PUB_STATUS = '//newsml:itemMeta/newsml:pubStatus';
var XPATH_CONTENT_CREATED = '//newsml:contentMeta/newsml:contentCreated';
var XPATH_CONTENT_MODIFIED = '//newsml:contentMeta/newsml:contentModified';
var XPATH_CONTENT_SET = '//newsml:contentSet';

class NewsItemValidator {
  validate(xml, callback) {
    var errorArray = [];
    try {
      var document = new DOMParser().parseFromString(xml);

      validateCommon(document)
        .then(function() {
          return getItemClass(document);
        })
        .then(function(itemClass) {
          if (itemClass === 'ninat:text') {
            return validateText(document);
          }
          else {
            return validatePicture(document);
          }
        })
        .then(function() {
          callback(null, errorArray);
        })
        .catch(function(error) {
          return callback(error);
        })
        .done();
    }
    catch (exception) {
      callback(exception);
    }
  }
}

function validateCommon(document) {
  return new Promise(function(fulfill, reject) {
    var errors = [];
    var select = xpath.useNamespaces({'newsml': 'http://iptc.org/std/nar/2006-10-01/'});

    try {
      // itemMeta
      validateMandatoryElement('itemMeta', select, XPATH_ITEM_META, document, errors);

      // contentMeta
      validateMandatoryElement('contentMeta', select, XPATH_CONTENT_META, document, errors);

      // uri
      validateURI(select, document, errors);

      // pubStatus
      validateMandatoryElement('pubStatus', select, XPATH_PUB_STATUS, document, errors);

      // versionCreated
      validateMandatoryElement('versionCreated', select, XPATH_VERSION_CREATED, document, errors);

      // firstCreated
      validateMandatoryElement('firstCreated', select, XPATH_FIRST_CREATED, document, errors);

      // contentCreated
      validateMandatoryElement('contentCreated', select, XPATH_CONTENT_CREATED, document, errors);

      // contentModified
      validateMandatoryElement('contentModified', select, XPATH_CONTENT_MODIFIED, document, errors);

      if (errors.length > 0) {
        reject(errors);
      }
      else {
        // Happy days!
        fulfill();
      }
    }
    catch (exception) {
      reject(exception.message);
    }
  });
}

function validateText(document) {
  return new Promise(function(fulfill, reject) {
    var errors = [];
    var iptcSelect = xpath.useNamespaces({'newsml': 'http://iptc.org/std/nar/2006-10-01/'});

    try {
      // contentSet
      validateMandatoryElement('contentSet', iptcSelect, XPATH_CONTENT_SET, document, errors);

      if (errors.length > 0) {
        reject(errors);
      }
      else {
        // Happy days!
        fulfill();
      }
    }
    catch (exception) {
      reject(exception.message);
    }
  });
}

function validatePicture(document) {
  return new Promise(function(fulfill, reject) {
    // Nothing specific to validate (as of now).
    fulfill();
  });
}

function validateURI(select, document, errors) {
  var nodes = select(XPATH_ITEM_EXT_PROP_URI, document);
  if (!nodes || nodes.length == 0) {
    errors.push('Missing mandatory itemMetaExtProperty with type \"imext:uri\"');
  }
  else if (nodes.length > 1) {
    errors.push(
      'Expected one itemMetaExtProperty with type \"imext:uri\" but found ' + nodes.length);
  }
}

function validateMandatoryElement(name, select, xpath, document, errors) {
  var nodes = getSafeNodeList(select, xpath, document);
  if (nodes.length == 0) {
    errors.push('Missing mandatory element ' + name);
  }
  else if (nodes.length > 1) {
    errors.push('Duplicate ' + name + ' elements found. Expected one');
  }
}

function getSafeNodeList(select, xpath, document) {
  var nodes = select(xpath, document);
  return (!nodes || nodes.length == 0) ? [] : nodes;
}

function getItemClass(document) {
  return new Promise(function(fulfill, reject) {
    try {
      var select = xpath.useNamespaces({'newsml': 'http://iptc.org/std/nar/2006-10-01/'});
      var node = select('//newsml:itemMeta/newsml:itemClass', document)[0];
      var itemClass = node.getAttribute('qcode');

      if (itemClass !== 'ninat:text' && itemClass !== 'ninat:picture') {
        reject('Unsupported itemClass ' + itemClass);
      }
      else {
        fulfill(itemClass);
      }
    }
    catch (exception) {
      reject('Error validating itemClass');
    }
  });
}

module.exports = NewsItemValidator;
