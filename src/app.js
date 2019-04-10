'use strict';

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const net = require('net');
const client = new net.Socket();
client.connect(3001, 'localhost', () =>{});

require('./logger.js');

const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from(buffer.toString().trim().toUpperCase());

const alterFile = (file) => {
  loadFile(file)
    .then( buffer => convertBuffer(buffer))
    .then( buffer => saveFile(file, buffer))
    .then( success => {
      let save = JSON.stringify({
      event: 'file-save',
      payload: {status: 1, file: file, text: 'saved properly'}})
      client.write(payload);
    })
    .catch( error => {
      let err = JSON.stringify({
        event: 'file-error',
        payload: {status: 0, file: file, text: error.message}})
        client.write(payload)
      });
};

let file = process.argv.slice(2).shift();
alterFile(file);
