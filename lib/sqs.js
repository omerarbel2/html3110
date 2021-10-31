const  AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const  sqs = new AWS.SQS({apiVersion: '2012-11-05'});


process.env['aws_access_key_id'] = '';
process.env['aws_secret_access_key'] = '';


const sendToSQS = function (url) {
    return new Promise((resolve, reject) => {
        try {
            var params = {
                MessageBody: url,
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/587963723005/ursl'};
              
              sqs.sendMessage(params, function(err, data) {
                if (err) {
                 // console.log("Error", err);
                  reject(err);
                } else {
                 // console.log("Success", data.MessageId);
                  resolve();
                }
              });
            
        } catch (e) {
            reject(e);
        }
    })
};



module.exports = {
    sendToSQS
};