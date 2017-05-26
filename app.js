var http = require('http');
var fs = require('fs');
var express = require('express'),
   	app = express(),
	bodyParser = require('body-parser'),
	path = require("path");
var mysql = require('mysql');

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

	//insertData(device, code, time, home);
});

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello Azure!");

// });

var server = app.listen(1337, function () {
  var port = server.address().port; 
  console.log("Server is running on port %s", port);
});

// var port = process.env.PORT || 1337;
// server.listen(port);

//console.log("Server running at http://localhost:%d", port);
