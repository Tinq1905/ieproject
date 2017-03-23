const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

var db;

app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));

app.listen(3000, () => {
    console.log('listening on 3000')
})

app.get("/test",function(req,res){
	console.log("Test");
	res.send("Test - Techsquad");
})

app.get("/apitest", function(req, res){
	var type = req.query.searchType;
	var location = req.query.myLocation;
	var radius = 500;
	var gkey = "AIzaSyDWr-XTd2CRiUhzGgaGBIYm7_HZE09hgqg";
	var furl ="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location +"&types="+type + "&rankby=distance" + "&key="+gkey;
	var turl ="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&types=food&rankby=distance&key=AIzaSyDWr-XTd2CRiUhzGgaGBIYm7_HZE09hgqg";
	sendBack(furl,res);
})

function sendBack (url,res) {
	var foo = [];
	https.get(url, function(response) {
		var body ="";
		response.on('data', function(chunk) {
			body += chunk;
		})
		response.on('end', function () {
			places = JSON.parse(body);
			var results = places.results;
			console.log(results[0]);
			for (i=0;i<5;i++){
				foo.push(results[i].name);
				foo.push(results[i].geometry.location);
			};
			res.send(foo);
		});
	})
}


