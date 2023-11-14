const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "coursework",
  password: "Admin"
});
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

connection.execute("SELECT name FROM users", function(err, results){
    console.log(err);
    console.log(results);

    conn.query('SELECT name FROM hello WHERE ID = 1', function(error, result, fields){
      console.log(result);    // как передать этот параметр? \( X_X)/
      app.get('/index', function (req, res) {
          res.render('index', { params: result });     // <-- здесь трабл.
      });
  });
  conn.end();


})