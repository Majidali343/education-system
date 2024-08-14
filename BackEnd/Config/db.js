const mysql = require('mysql');
// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rooftop-cultivation'
});
// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to database!');
  }
});
// close the MySQL connection
// connection.end();

module.exports= connection;