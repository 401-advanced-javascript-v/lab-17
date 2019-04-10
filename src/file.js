'use strict';

const fs = require('fs');
const util = require('util');
const net = require('net');

const socket = new net.Socket();

const options = {
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
}

socket.connect(options, () => {});

socket.on('close', function() {
  console.log('Connection closed');
})

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
let file = process.argv.slice(2).shift();

const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from(buffer.toString().trim().toUpperCase());

const alterFile = (file) => {
  return loadFile(file)
    .then( buffer => convertBuffer(buffer))
    .then( buffer => saveFile(file, buffer))
    .then( () => socket.write(`save ${file}`) && socket.end())
    .catch( error => socket.write(`error $(error)`) && socket.end());
};

module.exports = {loadFile, saveFile, convertBuffer, alterFile};