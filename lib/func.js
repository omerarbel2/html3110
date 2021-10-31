const { insertUrlIfNotExists, updateHtml} = require('./dal');
const { sendToSQS } = require('./sqs');
const parse = require('lusha-mock-parser');
const URL = require("url").URL;

const stringIsAValidUrl = (s) => {

    return isNaN(s)
    /*try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }*/
  };



const UrlHundler = async (url)=> {
    try {

        if (!stringIsAValidUrl(url)){
            return 'not-valid-url'
        }

        let res = await insertUrlIfNotExists(url);
        let arrTask = [];

        if (res==='ok'){ // not exists
           let parseData =  parse(url);

           if (!parseData){
            throw new Error('problem with the parser');  
           }

            if (parseData.html){
             await updateHtml(url, parseData.html);  
            }
            if (parseData.links){
                parseData.links.forEach(link => {
                    arrTask.push(sendToSQS(link));
                  })
                  Promise.all(arrTask);
            }
        } 
        return res;
    } catch (e) {
        throw new Error(e);
    }
}



module.exports = {
    UrlHundler
};