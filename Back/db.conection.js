const mysql  = require('mysql');


const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'produccion',
  port: '3306'
});


module.exports = pool
