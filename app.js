var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require("path");

var http = require('http');

var mysql = require('mysql');
var con = mysql.createConnection({
   host: "ja-cdbr-azure-west-a.cloudapp.net",
   user: "b3039e4b16716a",
   password: "64e1354d",
   database: "edge"
});

var fs = require('fs');
var obj;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'www')));

app.post('/', function(req, res){
	var device = req.body.Device;
	var code = req.body.Code;
	var time = req.body.Time;
	var home = req.body.Home;
	console.log("Device : " + device + ", Code : " + code + ", Time :" + time + ", Home : " + home);

	fs.readFile('data.json', 'utf8', function(err, data) {
		if(err) throw err;
		obj = JSON.parse(data);
		console.log(obj.data[device][code]);
		res.setHeader('Content-type', 'text/html');
		res.send("Message : " + obj.data[device][code]);
	});

	insertData(device, code, time, home);
});

function insertData(device, code, time, home){
	var sql = "INSERT INTO MainLog (Device, Code, Time, Home) VALUES ('" + device + "','" + code + "','" + time + "','" + home + "')";
	con.query(sql, function(err, result){
		if(err) throw err;
	});
}

var server = app.listen(8081, function () {
   var port = server.address().port; 
   console.log("Server is running on port %s", port);
});
