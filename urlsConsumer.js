const { Consumer } = require('sqs-consumer');
const { UrlHundler } = require('./lib/func');

const express = require('express')

const exp = express()

exp.get('/isAlive', async function (req, res) {
    res.send('ok');
})


process.env['aws_access_key_id'] = '';
process.env['aws_secret_access_key']=  '';


const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/587963723005/ursl',
  handleMessage: async (message) => {
      console.log('url---'+message.Body)
    await UrlHundler(message.Body);
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();

exp.listen(3001)