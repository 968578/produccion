const mysql  = require('mysql');
require('dotenv').config()



const pool = mysql.createPool({
  host     : process.env.DBHOST,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBDATABASE,
  port: process.env.DBPORTDB
});


module.exports = pool
