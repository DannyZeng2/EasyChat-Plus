/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-20 15:24:44
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-20 22:12:55
 */
const mysql = require('mysql')

module.exports = {
  config: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'easychat'
  },

  getDBConnection(sql, params, callback) {
    let connection = mysql.createConnection(this.config);
    connection.connect();
    connection.query(sql, params, callback);
    connection.end();
  }
}