var http = require('http');

module.exports = function(robot) {
	robot.hear(/wetter/gi, function(res){
		robot.http("http://api.openweathermap.org/data/2.5/forecast/city?id=2950159&APPID=dbbb8f9e742511a9d2ec108ee082d737&units=metric")
		.get() (function(err, result, body) {
			var parsed = JSON.parse(body);
			var today = new Date();
			today = today.toISOString().substring(0,10);
			var parsed_today = parsed.list.filter(function(obj){
				return obj.dt_txt.substring(0,10) == today;
			});
			var s = "";
			for (var i in parsed_today) {
				var tmp = parsed_today[i].dt_txt.substring(11,16) + " - " + parsed_today[i].weather[0].description +" - " + parsed_today[i].main.temp+"°C\n\n";
				console.log(tmp); 
				s+=tmp;
			}
			console.log(s);
			res.send(s);
		});
	});
}