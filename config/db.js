const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "UniDB",
  ssl: {
    rejectUnauthorized: false, // Disable SSL verification if necessary
  },
  authPlugins: {
    mysql_native_password: () => {},
  },
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = connection;
