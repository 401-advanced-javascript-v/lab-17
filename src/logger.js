'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => {});


client.on('file-save', (json) => {
    let event = JSON.parse(json).event;
    let payload = JSON.parse(json).payload;
    console.log(event);
    console.log(payload);
    
    console.log(`${file} saved`);
  });


  client.on('file-error', (json) => {
    let event = JSON.parse(json).event;
    let payload = JSON.parse(json).payload;
    console.log(event);
    console.log(payload);
    
    console.error(err.message);
  });