'use strict';

const files = require('./file.js');

let file = precess.argv.slice(2).shift();

if(file) {
  files.alterFile(file);
}