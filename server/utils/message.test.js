const expect = require('expect');

var {generateMessage} = require('./message');

describe('generate Message', () => {
    it('should generate the correct message object', () => {
        var from = 'Winkel';
        var text = 'Kill Youself';
        var message = generateMessage(from, text);
        expect(message).toMatchObject({text, from})
        expect(typeof message.createdAt).toBe('number');
    })
})