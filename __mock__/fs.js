'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if( !file || file.match(/bad/i) ) {
    cb('Invalid File');
  }
  else {
    cb(undefined, new Buffer('File Contents'));
  }
};

exports.writeFile = (file, data, cb) => {
  if( file.match(/bad/i) ) {
    cb('invalid File');
  }
  else {
    cb(undefined, new Buffer('File Contents'));
  }
};