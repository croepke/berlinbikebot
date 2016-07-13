module.exports = function(robot) {
	robot.hear(/Servus/gi, function(res){
		res.send("Hallo Boris!");
	});
}
