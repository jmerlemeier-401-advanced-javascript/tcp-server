### app.js

```js
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
```


### server.js

```js

'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  for (let socket in socketPool) {
    socketPool[socket].write(`${event} ${text}`);
  }
};
```

### logger.js

```js
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
```

***

#### Terminal window #1
`node server.js`

#### Terminal window #2
`node app.js filepathfolder/filepath.txt`

#### Terminal window #3
`node logger.js`

***

### npm intall

`npm install jest eslint `