var bodyParser = require('body-parser');
var mysql = require('mysql');
const express = require('express');  
const app = express();  
const port = 3000;  

app.listen(port, () => {
    console.log(`Server running at ${port}/`);
  });

app.use(bodyParser.json());

var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',      
    password : '',
    database : 'mydb',
    dateStrings : true
});

app.get('/', (req,res) => {

    let sql=`SELECT * FROM toDo `;

    console.log(sql);

    connection.query(sql, function(result){
        console.log(result);
        res.statusCode = 200;
        res.json(result);
    });
});