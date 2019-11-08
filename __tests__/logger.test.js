'use strict';

const logger = require('../logger');

describe('Testing Log Handler', () => {
  it('Can console.log', () => {
    let spy = jest.spyOn(console, 'log');
    const testBuffer = Buffer.from(JSON.stringify({event: 'test', text: 'test'}))
    logger.handleData(testBuffer);
    expect(spy).toHaveBeenCalledWith('Ignored');
  });
})
