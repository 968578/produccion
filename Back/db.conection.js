const mysql  = require('mysql');


const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'contrasena',
  database : 'produccion',
  port: '3306'
});


module.exports = pool
