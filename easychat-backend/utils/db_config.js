const mysql = require('mysql')

module.exports = {
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'easychat'
    },

    getDBConnection(sql,params,callback) {
        let connection = mysql.createConnection(this.config);
        connection.connect();
        connection.query(sql,params,callback);
        connection.end();
    }
}
