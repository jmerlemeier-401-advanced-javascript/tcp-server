'use strict';

const net = require('net');
const client = new net.Socket();



// we get a buffer from our server
const handleData = (buffer) => {
  const data = JSON.parse(buffer);
  //listend for error and save events.
  if (data.event === 'read_error' || data.event === 'write_error'){
    console.error(data);
  } else if (data.event === 'write_successful') {
    console.log(data);
  } else {
    console.log('Ignored');
  }
}

if (process.env.NODE_ENV !== 'test') {
  client.connect(3001, 'localhost', () => {
    //when the listener fires, 
    console.log('logger has connected');
  });
  client.on('data', handleData)
};

module.exports = {
  handleData,
}