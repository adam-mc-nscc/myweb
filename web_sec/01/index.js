const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let mysql = require('mysql');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

console.log("starting up");
// This is just "confirm the DB is working/sample code"
//  I am commenting it out, but leaving it in case you 
//  want to see how to connect to a database.
/*
var mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "adam",
    password: "badpass"
  });

mySqlConnection.connect((error) => {
    if (error) {
        console.log("Error connecting " + 
            "to SQL: " + error);
        return;
    }
    console.log("DB connected");
    //DO STUFF WITH DB HERE
    
    let sql = "SELECT * FROM web_db.pets;"
    mySqlConnection.query(sql, function (error, result) {
        if (error) {
            console.log("Error querrying " + 
                " SQL: " + sql);
            console.log("Error was: " + error);
            return;
        }
        console.log("Result: " + result);
        console.log("Result: " + JSON.stringify(result) +"\n");
        
        
        console.log("result[0].name = " + result[0].name);
        console.log("result[0].species = " + result[0].species);
        console.log("result[0].birthday = " + result[0].birthday);

        console.log("result[3].name = " + result[3].name);
        console.log("result[3].species = " + result[3].species);
        console.log("result[3].birthday = " + result[3].birthday);
        
    });
});
*/

//Default AKA "home" AKA "root" aka... I dont know, the first page
app.get('/', function(request, response) {
    console.log("in app.get /");
    response.sendFile('C:/myweb/myweb/web_sec/01/index.js');
});

// http://localhost:80/auth
app.post('/auth', function(request, response) {
    console.log("in app.post /auth");
	//get the values from the "body"
	let username = request.body.username;
	let pin = request.body.pin;
    console.log(request.body);
    // check for if they are set
	if (username && pin) {
        console.log("username = " + username);
        console.log("pin = " + pin);
        
        /*mySqlConnection.connect((error) => {
            if (error) {
                console.log("Error connecting " + 
                    "to SQL: " + error);
                return;
            }
            console.log("DB connected");
            //DO STUFF WITH DB HERE
        });*/
                
        
        if (username == "adam" && pin == "0003")
        {
            response.status(200).json('You got in!');
            response.end();
        }
        else
        {
            response.status(401).json('Wrong pin you hacking bugger!!');
		    response.end();
        }
	} else  //If they did nto enter a username/passwpord
    {
		response.send('Please enter Username and pin!');
		response.end();
	}
});

app.post("*", function(request, response) {
    response.render("this aint right (post)");
});

app.get("*", function(request, response) {
    response.render("this aint right (get)");
});

app.listen(80);