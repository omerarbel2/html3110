const { Console } = require('console');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'
});


const query = function (query) {
    return new Promise((resolve, reject) => {
        try {

            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log('errr-' + error)
                    reject(error)
                }
                else {
                    console.log('hehe here results')
                    resolve(results)
                }
            });
        } catch (e) {
            reject(e);
        }
    })
};



const insertUrlIfNotExists = async (url) => {
    try {
        await query(`insert into urls.url_info (url) values ('${url}')`)
        return 'ok';

    } catch (e) {
        if (e.toString().includes('ER_DUP_ENTRY: Duplicate entry')) {
            return 'ok-dup'
        }
        throw new Error(e)
    }
}


const updateHtml = async (url, html) => {
    try {
        await query(`update urls.url_info  set html='${html}' where url='${url}'`);
    } catch (e) {
        throw new Error(e)
    }
}


const getUrlfExists = async (url) => {
    try {
        return await query(`select url, html from urls.url_info where url='${url}' `)   
    } catch (e) {

        throw new Error(e)
    }
}

const initializeDatabase = async (url) => {
    try {
        return await query(`truncate table urls.url_info`);  
    } catch (e) {

        throw new Error(e)
    }
}


module.exports = {
    insertUrlIfNotExists,
    updateHtml,
    getUrlfExists,
    initializeDatabase
};