var http = require('http');

var weather_map = {
	"thunderstorm" : '\u{1F4A8}',   
 	"drizzle" : '\u{1F4A7}',
 	"light rain" : '\u{02614}',      
 	"rain" : '\u{02614}',            
	"snowflake" : '\u{02744}',       
	"snowman" : '\u{026C4}',         
	"atmosphere" : '\u{1F301}',     
	"clear sky" : '\u{02600}',       
	"few clouds" : '\u{026C5}',       
	"clouds" : '\u{02601}',         
	"hot" : '\u{1F525}',
	"defaultEmoji" : '\u{1F300}'  
};

var weather_map2 = {
	"thunderstorm" : 'Sturm',   
 	"drizzle" : 'Nieselregen',
 	"light rain" : 'Leichter Regen',        
 	"rain" : 'Regen',            
	"snowflake" : 'Schnee',       
	"snowman" : 'Schneemann',         
	"atmosphere" : '',     
	"clear sky" : 'Klarer Himmel',       
	"few clouds" : 'Leicht bewölkt',       
	"clouds" : 'Bewölkt',         
	"hot" : '',
	"defaultEmoji" : '\u{1F300}'  
};

var map_description = function(description) {
	console.log(description);
	return weather_map[description];
}

var map_language = function(description) {
	console.log(description);
	return weather_map2[description];
}

module.exports = function(robot) {
	robot.hear(/wetter/gi, function(res){
		robot.http("http://api.openweathermap.org/data/2.5/forecast/city?id=2950159&APPID=dbbb8f9e742511a9d2ec108ee082d737&units=metric")
		.get() (function(err, result, body) {
			var parsed = JSON.parse(body);
			// small hack for demonstration purposes - set date to tomorrow to retrieve forecast for the whole day
			var today = new Date('2016-06-27 08:00:00');
			today = today.toISOString().substring(0,10);
			var parsed_today = parsed.list.filter(function(obj){
				return obj.dt_txt.substring(0,10) == today;
			});
			// small hack for demonstration purposes: get only date from 09:00 onwards
			parsed_today = parsed_today.slice(Math.max(parsed_today.length - 5, 1))
			var s = "Das Wetter heute wird wie folgt: \n\n";
			for (var i in parsed_today) {
				console.log(parsed_today[i].weather[0]);
				var tmp = parsed_today[i].dt_txt.substring(11,16) + " - " + map_description(parsed_today[i].weather[0].description) + " " + map_language(parsed_today[i].weather[0].description) +" - " + Math.round(parsed_today[i].main.temp)+"°C\n\n";
				console.log(tmp); 
				s+=tmp;
			}
			console.log(s);
			res.send(s);
		});
	});

	robot.hear(/regen/gi, function(res){
		robot.http("http://api.openweathermap.org/data/2.5/forecast/city?id=2950159&APPID=dbbb8f9e742511a9d2ec108ee082d737&units=metric")
		.get() (function(err, result, body) {
			var parsed = JSON.parse(body);
			// small hack for demonstration purposes - set date to tomorrow to retrieve forecast for the whole day
			var today = new Date('2016-06-27 08:00:00');
			today = today.toISOString().substring(0,10);
			var parsed_today = parsed.list.filter(function(obj){
				return obj.dt_txt.substring(0,10) == today;
			});
			// small hack for demonstration purposes: get only date from 09:00 onwards
			parsed_today = parsed_today.slice(Math.max(parsed_today.length - 5, 1))
			var rain = false;
			for (var i in parsed_today) {
				if(parsed_today[i].weather[0].description.includes("rain")) {
					var rain = true;
				}
			}
			console.log(rain);
			if(rain) {
				res.send("Eine Regenjacke wäre sinnvoll heute! \u{2614} ");
			}
			else {
				res.send("Heute kannst du die Regenjacke zu Hause lassen! ");
			}
		});
	});
}