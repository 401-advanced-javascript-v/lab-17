'use strict';

const net = require('net');

const socket = new net.Socket();

const options = {
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
}

const incomingData = data => {
  console.log('Received:' + data);
}

const closeConnection = () => {
  console.log('Connection Closed');
}

socket.connect(options, () => {});
socket.on('data', incomingData);
socket.on('close', closeConnection);