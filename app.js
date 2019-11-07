'use strict';

//we want to make something that will make a connection our host server. 

const net = require('net');

const client = new net.Socket();

const events = ['write', 'read', 'update'];

client.connect(3001, 'localhost', () => {
  console.log('App connected to host');
});

setInterval( () => {
  let event = events[Math.floor(Math.random() * events.length)];
  //want to send some data to the server
  client.write(`${event} someone is trying to ${event}`);
}, 500); //want to do this every half second.