'use strict';

//fake version of the functions. We do not want to actually modify our file system. 
//Creating a mock of code. You have to sopy to flow of that code. What are expected inputs and outputs.

//Inputs: file, cb
//Outputs: Return a buffer
//How Handle Errors: FS uses error first callback.
exports.readFile = (file, cb) => {
  if (!file || file.match(/bad/i)){
    cb('invalid file'); //errorfirst callback
  } else {
    cb(undefined, new Buffer('File Contents'));
  }
};

//Inputs: file, buffer, callback
//Outputs: Nothing, no values returned
//How does it handle errors: 
exports.writeFile = (file, buffer, cb) => {
  if(file.match(/bad/i) ) {//regex, if file is bad
    cb('Invalid File');
  }
  else if (!Buffer.isBuffer(buffer)) {
    cb('Invalid Buffer');
  } else {
    cb(undefined, undefined);//does not pass us back any data nor any errors. 
  }
};