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

  let dispatchEvent = (buffer) => {
    let text = buffer.toString().trim();
    for (let socket in socketPool) {
      socketPool[socket].write(`${text}`);
    }
    // console.log(`IGNORE: ${event}`);
};


