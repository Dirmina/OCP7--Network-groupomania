var mysql = require('mysql');
 
console.log('Get connection ...');
 
var connectdb = mysql.createConnection({
  database: 'groupomania',
  host: "localhost",
  user: "root",
  password: ""
});
 
connectdb.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connectdb;