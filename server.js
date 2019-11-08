'use strict';

//TCP connection Library Net
const net = require('net');
const uuid = require('uuid/v4');

//I am the host server.
// factory, creates object with a bunch of methods that facilitate this RTCPeerConnection.
const server = net.createServer();
const port = process.env.port || 3001;

const socketPool = [];

server.listening(port, () =>{
  console.log(`TCP server is up on: ${port}`);
})

server.on('connection', (socket) => {
  const id = `Socket-${uuid()}`;
  socketPool[id] = socket;
  console.log('Someone connected', id);
  socket.on('data', (buffer) => { 
    dispatchEvent(buffer);
  socket.on('close', () => {
    delete socketPool[id];
  })
  });
});

const dispatchEvent = (buffer) => {
 let text = buffer.toString().trim();
 let [text, payload] = text.split(/\s+(.*)/);

 let eventPayload = {event, payload};
 //iterate over object. socket is the key.
 //for eery socket in my socketpool, I am going to grab my payload and send it 
 for(let socket in socketPool){
   //need to turn object into a string
  socketPool[socket].write(JSON.stringify(eventPayload));
 }
}