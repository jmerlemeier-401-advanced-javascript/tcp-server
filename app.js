'use strict';

//we want to make something that will make a connection our host server. 

//1. Create promises
const fs = require('fs');

//==================================
//2. 
const net = require('net');
const client = new net.Socket();

//==================================

let file = process.argv.slice(2).shift();

//==================================

const util = require('util');
const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);


//==================================

const readFile = (filePath) => fsRead(filePath);
const writeFile = (filePath, buffer) => fsWrite(filePath, buffer);
const upperCase = (buffer) => {
  const convertedBuffer = buffer.toString().trim().toUpperCase();
  return Buffer.from(convertedBuffer);
}
//==================================

const events = {
  read_error: 'read_error', 
  write_error: 'write_error', 
  write_successful: 'write_success'
};

//==================================


const alterFile = (path) => {
  return readFile(file)
  .then(data => upperCase(data))
  .then(buffer => {
    return writeFile(file, buffer)
      .catch(e => client.write(`${events.write_error} ${e}`));
  })
  .then(() => client.write(`${events.write_successful} ${path}`))
  .catch(e => client.write(`${events.write_error} ${e.text}`)) //write a message to the socket.
};

if (process.env.NODE_ENV !== 'test') {
  client.connect(3001, 'localhost', () => {
    console.log('App connected to host');
    alterFile(file);
});
}

//==================================

module.exports = {
  readFile, 
  writeFile, 
  upperCase,
}
