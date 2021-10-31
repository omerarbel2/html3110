const express = require('express')
const { UrlHundler } = require('./lib/func');


process.env['aws_access_key_id'] = 'AKIAYRZK6NT6QHLZEI43';
process.env['aws_secret_access_key'] = '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';

const app = express();

const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

app.get('/isAlive', async function (req, res) {
    res.send('ok');
})

app.post('/parse', async function (req, res) {
    try {
        let valid = await UrlHundler(req.body.url);
        if (valid === 'not-valid-url') {
            return res.status(400).send('not a valid url input');
        } 
        res.send('ok');
    } catch (e) {
        return res.status(500).send()
    }
});


app.listen(3000)

// Exporting the app module
module.exports = app;

