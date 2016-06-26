module.exports = function(robot) {
	robot.hear(/guten morgen|hallo/gi, function(res){
		res.send("Guten Morgen du schöner Fahrradfahrer!");
		setTimeout(function(){
			robot.emit('telegram:invoke', 'sendSticker', { chat_id: 89109672, sticker: 'BQADAgADPQADyIsGAAHaVWyyLugSFAI' }, function (error, response) {
	            console.log(error);
	            console.log(response);
        	});
        }, 1000);
	});

	robot.hear(/wie geht es dir/gi, function(res){
		res.send("Du, mir geht's prächtig! Wie geht's dir?");
	});

	robot.hear(/mir geht es gut/gi, function(res){
		res.send("Das freut mich zu hören!");
	});

	robot.hear(/geht so/gi, function(res){
		res.send("Oh, dann lass mich dich ein wenig aufmuntern.");
		setTimeout(function(){
			robot.emit('telegram:invoke', 'sendSticker', { chat_id: 89109672, sticker: 'BQADAgADQwEAAvR7GQABzeqCC-X7ZYQC' }, function (error, response) {
	            console.log(error);
	            console.log(response);
        	});
        }, 1000);
	});

	robot.hear(/mir geht es schon viel besser\?/gi, function(res){
		res.send("Das freut mich zu hören!");
	});

	robot.hear(/tschüssi/gi, function(res){
		res.send("#cyclehackberlin #betteronabike");
		setTimeout(function(){
			res.send("we \u{1F6B2} berlin!");
        }, 1000);
	});
}