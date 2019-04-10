'use strict';

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const net = require('net');
const client = new net.Socket();
client.connect(3001, 'localhost', () =>{});

const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from(buffer.toString().trim().toUpperCase());

const alterFile = (file) => {
  loadFile(file)
    .then( buffer => convertBuffer(buffer))
    .then( buffer => saveFile(file, buffer))
    .then( success => console.log(`${file} saved`))
    .catch( error => console.error(err))
};