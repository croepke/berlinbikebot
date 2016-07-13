var SlackRobot = require('slack-robot');
var robot = new SlackRobot(process.env.HUBOT_SLACK_TOKEN);

robot.listen('hello', function (req, res) {
	var username = req.user.name;
  return res.text('hello ' + username).send();
});

robot.start();
