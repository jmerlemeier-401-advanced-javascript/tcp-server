'use strict';

jest.mock('fs');

const app = require('../app.js');

describe('Testing file function', () =>{
  it('Can read a file', (done) => {
    app.readFile('test.txt')
      .then(contents => {
        expect(Buffer.isBuffer(contents)).toBeTruthy();
        done();
      });
  });

  it('Can write a file', () => {

  });
}) 