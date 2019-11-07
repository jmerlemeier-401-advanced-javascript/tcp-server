'use strict';

//TCP connection Library Net
const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => {
  //when the listener fires, 
  console.log('logger has connected');
});

client.on('data', (data) => {
  console.log(data);
});