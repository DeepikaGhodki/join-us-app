var express = require('express');
var app = express();
var mysql = require('mysql');
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  password : 'root',
  database : 'join_us'   // the name of your db
});


 
app.get("/", function(req, res){
 var q = 'SELECT COUNT(*) as count FROM users';
 connection.query(q, function (error, results) {
 if (error) throw error;
 var count = results[0].count;
 res.render('home', {count:count});
 });
});

app.post('/register', function(req,res){
console.log(req.body);
 var person = {email: req.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 console.log(err);
 console.log(result);
 res.redirect("/");
 });
});
 
app.listen(8080, function () {
 console.log('App listening on port 8080!');
});
