const bodyParser = require("body-parser");
const https = require("https");
const async = require("async");

async.waterfall([basicInfo,detailedInfo],function(err, result){
    if(err){
        console.log(err);
    }
	console.log(result);
});

function thePlace(){
	this.place_id = "";
	this.name = "";
	this.location = "";
	this.opening_hours = "";
	this.address = "";
	this.numbers = "";
	this.rating = "";
	this.price_level = "";
	this.website = "";
	this.url = "";
	this.photo = "";
}

function basicInfo(callback){
	var final = [];
	var type = "cafe";
	var location = "-33.8670,151.1957";
	var gkey = "AIzaSyDWr-XTd2CRiUhzGgaGBIYm7_HZE09hgqg";
	var purl ="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ location +"&types="+type + "&rankby=distance" + "&key="+gkey;
	https.get(purl, function(response) {
		var body ="";
		response.on('data', function(chunk) {
			body += chunk;
		})
		response.on('end', function () {
			places = JSON.parse(body);
			var results = places.results;
			for (i=0;i<2;i++){
				var myPlace = new thePlace();
				myPlace.name = results[i].name;
				myPlace.location = results[i].geometry.location;
				myPlace.opening_hours = results[i].opening_hours;
				myPlace.place_id = results[i].place_id;
				myPlace.price_level = results[i].price_level;
				myPlace.rating = results[i].rating;
				final.push(myPlace);
			}
			//res.send(final);
			callback(null,final);
		})
	})
}

function detailedInfo(final,callback){
    var count = 0;
	for (i=0;i<2;i++){
        ++count;
        var j = i;
		var placeId = final[i].place_id;
        //var placeId = "ChIJIfBAsjeuEmsRdgu9Pl1Ps48"
		var durl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyDWr-XTd2CRiUhzGgaGBIYm7_HZE09hgqg";
        function back (durl,i){
		https.get(durl,function(response) {
			var body ="";
			response.on('data', function(chunk) {
				body += chunk;
			})
			response.on('end', function () {
				places = JSON.parse(body);
				var results = places.result;
				final[i].address = results.formatted_address;
				final[i].numbers = results.formatted_phone_number;
				final[i].website = results.website;
				final[i].url = results.url;
				//res.send(final);
                --count;
                if (count === 0){
                    callback(null,final);
                };
			})
		})}
        back(durl,i);
	}
    
}
