var async = require('async');
var fs = require('fs');
var libePath = require('path').resolve('./lib');
var lbs = {};

/**
 * Module's caller
 * @param {String} mdl
 */
global.lib = function (mdl) {
  return require(libePath.replace(/\/$/gi, '') + '/' + mdl);
};


/**
 * Module's preliminary initialization
 * @param {String} mdl Module name
 * @param {Function} callback
 */
global.after = function (mdl, callback) {
  if (typeof callback !== 'function') {
    callback = function () {};
  }

  // array of elements
  if (Array.isArray(mdl)) {
    async.eachSeries(mdl, function (item, callback) {
      global.after(item.replace(/\.js$/gi, ''), callback);
    }, function done() {
      callback();
    });

  // one element
  } else if (typeof mdl === 'string' && mdl.length && !lbs[mdl]) {

    lbs[mdl] = true;
    var module = lib(mdl);

    if (typeof module.init === 'function') {

      // async call
      if (module.init.length > 0) {
        module.init(callback);

      // sync call
      } else {
        module.init();
        callback();
      }
    } else {
      callback();
    }
  } else {
    callback();
  }
};


/**
 * Set path of library directory
 * @param {String} path
 * @param {Function} callback
 */
exports.setPath = function (path) {
  libePath = path;
  return exports;
};


/**
 * Initialization of library
 * @param {String} path
 * @param {Function} callback
 */
exports.init = function (path, callback) {

  if (typeof path === 'string') {
    libePath = path;
  } else if (typeof path === 'function') {
    callback = path;
  }

  if (typeof callback !== 'function') {
    callback = function () {};
  }

  fs.readdir(libePath, function (err, files) {
    if (err) {
      console.trace(err);
      callback(err);
    } else {
      global.after(files, callback);
    }
  });

  return exports;
};
