//Module :
var mysql = require('mysql');
 
console.log('Get connection ...');

//Création de la connexion :
var connectdb = mysql.createConnection({
  database: 'groupomania',
  host: "localhost",
  user: "root",
  password: ""
});

//connexion :
connectdb.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connectdb;