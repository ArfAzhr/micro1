const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
var con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "be5adb20bb639b",
  password: "8bde3cb3",
  database: "heroku_d7215cbb34d7f42"
});
app.get('/', (req, res) => {
  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "SELECT * FROM student";
      con.query(sql, function (err, result, fields) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      tempconnection.release();
      });
    }
  });
});
app.listen(process.env.PORT || port, () => {
  console.log('Example app listening to Heroku port.');
});