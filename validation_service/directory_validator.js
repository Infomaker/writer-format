'use strict';

var Validator = require('./validator');
var EventEmitter = require('events').EventEmitter;

var fs = require('fs');
var path = require('path');
var colors = require('colors');

var dirArg = process.argv.length < 3 ? '' : process.argv[2];
if (dirArg === '' || !dirArg.startsWith('directory=') || dirArg === 'directory=') {
  console.log('Missing mandatory parameter \"directory=path/to/messages\"');
}
else {
  var directory = dirArg.split('=')[1].trim();
  console.log('==> Scanning directory:'.bold, directory + '...');

  var errorCount = 0;
  var warnCount = 0;

  const filesEE = new EventEmitter();
  filesEE.on('fatal_error', function(err, fileName) {
    console.error('\n==> FATAL ERROR:'.bold.red, fileName.bold, '\n', err);
  });
  filesEE.on('error', function(err, fileName) {
    console.error('\n==> ERROR:'.bold.red, fileName.bold, '\n', err);
  });
  filesEE.on('warning', function(warn, fileName) {
    console.warn('\n==> WARN:'.bold.yellow, fileName.bold, '\n', warn);
  });
  filesEE.on('processed', function(fileCount, fileCounter) {
    if (fileCount == fileCounter) {
      console.log(
        '\n==> DONE!'.bold, '\nProcessed files:', fileCount +
        '\nErrors:', errorCount +
        '\nWarnings:', warnCount
      );
    }
  });

  fs.readdir(directory, function(err, files) {
    if (err) {
      console.error('Could not list the directory.'.bold.red, err);
    }
    else {
      var fileCount = files.length;
      var fileCounter = 0;
      files.forEach(function(file) {
        var filePath = path.join(directory, file);
        fs.readFile(filePath, function(err, data) {
          if (err) {
            filesEE.emit('fatal_error', 'Could not read file', file);
          }
          else {
            if (file.startsWith('.')) {
              warnCount++;
              fileCounter++;
              filesEE.emit('warning', 'Ignoring file', file);
              filesEE.emit('processed', fileCount, fileCounter);
            }
            else {
              new Validator().validate(data.toString(), function(error) {
                fileCounter++;
                if (error) {
                  errorCount++;
                  filesEE.emit('error', error, file);
                }
                filesEE.emit('processed', fileCount, fileCounter);
              });
            }
          }
        });
      });
    }
  });
}