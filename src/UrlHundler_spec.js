const { UrlHundler } = require('../lib/func');
const { getUrlfExists, initializeDatabase } = require('../lib/dal');
const { beforeAll } = require('@jest/globals');
jest.useFakeTimers()



beforeAll(() => {
    return initializeDatabase();
});


describe('test UrlHundler', () => {

    const random = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const url = `http://domin.com/${random}`

    it('UrlHundler save', async () => {
        let result = await UrlHundler(url);
        expect(result).toEqual('ok');
    });

    it('get from db', async () => {
        let result = await getUrlfExists(url);
        expect(result[0].url).toEqual(url);
        expect(result[0].html).not.toBeNull()
    });

    it('UrlHundler already exists ', async () => {
        let result = await UrlHundler(url);
        expect(result).toEqual('ok-dup');
    });


    it('UrlHundler in valid url', async () => {
        let result = await UrlHundler('99999');
        expect(result).toEqual('not-valid-url');
    });


});







