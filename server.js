'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};
let goodEvent = ['file-save', 'file-error'];

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Welcome', id);
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    console.log(`Goodbye, ${id}`);
    delete socketPool[id];
  });
});

let dispatchEvent = (json) => {
  // let parsed = JSON.parse(buffer);
  let {event, payload} = JSON.parse(json);
  // let message = JSON.stringify({event, payload})
  if(goodEvent.includes(event)){
    console.log(`BROADCAST: ${event}`);
    for (let socket in socketPool) {
      socketPool[socket].write(`${event} ${payload}\n`);
    }
  }
  else {
    console.log(`IGNORE: ${event}`);
  }
};


