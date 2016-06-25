// get bike routes from http://www.bbbike.de

module.exports = function(robot) {
    robot.respond(/route from (.*) to (.*)/i,
        function(res) {
            res.reply("okay, route from " + res.match[1] + " to " + res.match[2]);
        }
    );
}
