'use strict';

var fs = require('fs');
var path = require('path');
var deps = require('./deps.js');
var kConfig = require('./kConfig.js');
var _util = require('./util.js');

module.exports.getAppNames = function(callback) {
  deps.call(function(globalConfig) {
    var root = globalConfig.appsRoot;
    fs.readdir(root, function(err, filenames) {
      if (err) {
        callback(err);
      } else {
        var filter = function(filename) {
          var filepath = path.join(root, filename, kConfig.CONFIG_FILENAME);
          return fs.existsSync(filepath);
        };
        var results = _util.helpers.filter(filenames, filter);
        callback(err, results);
      }
    });

  });
};