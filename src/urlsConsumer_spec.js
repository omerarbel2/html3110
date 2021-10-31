const { getUrlfExists, initializeDatabase } = require('../lib/dal');
const { sendToSQS } = require('../lib/sqs');

jest.setTimeout(30000)

describe('test Url consumer', () => {

    const random = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const url = `http://domin.com/${random}`

    sendToSQS(url)

    it('Url consumer save', async () => {

        await sendToSQS(url);
        setTimeout(async () => {
            let result = await getUrlfExists(url);
            expect(result[0].url).toEqual(url);
            expect(result[0].html).not.toBeNull();
        }, 3000);
    });

});
