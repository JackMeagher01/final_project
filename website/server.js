var express = require('express');//loads express
var mysql = require('mysql');//loads mysql


var app = express();//initialises express
app.use(express.static('public')) //sets express to draw files from the 'public' folder

app.get('/', (req,res) => res.sendFile('/database.html')); //sends the index.html file from public by default

var con = mysql.createConnection({ //creates a connection object with config
    host: "35.189.121.127", // add the url of the Database Server
    user: "D0020", // the username for the Database Server
    password: "password569206", // the password for the Database Server
    database: "Joe2" // the Database to use
  }); // this needs to be updated, obviously


con.connect(function(err) { //calls connect, a method of the connection object, with a callback
    if (err) throw err; // specifies what to do in the case of an error
    console.log("Connected to DB!"); // tells me I'm connected
    let sql = "select * from Personality;"; // the database query to use to return info
    con.query(sql, function (err, result) { // executes above query using a callback specifying...
      console.log(result);
      if (err) throw err; // what to do with an error
      if (result) {processData(result)}; // what to do with a result, i.e. calls function below
    });
    
  });
  
function processData(data) { // called by above
    var dataToSend =[]; //creates an empty array with data to be sent to frontend
    for (row of data) { //loops through the data to get the database rows
      for (key of Object.keys(row)) {// make sure all columns are represented
        dataToSend.push(key+ " : "+row[key]) // pushes all fields to data to send
      } // you could do this a more effective way, with an array of arrays, this is just an example
    }
    //console.log(dataToSend) // << if you uncomment this you can see what data will be sent
    app.get('/api/', (req,res) => res.send({data:dataToSend})); //this actually sends the data
  }
  
app.listen(3000,()=>console.log("http://localhost:3000")); //starts listening with a friendly link