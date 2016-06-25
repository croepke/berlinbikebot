// get bike routes from http://www.bbbike.de

module.exports = function(robot) {
    var test = "Hallo Welt"

    var responseFunction = function(response) {
        response.reply("okay, route from " + response.match[1] + " to " + response.match[2]);

        // http get the route
        // http://www.bbbike.de/cgi-bin/bbbike.cgi?startname=Prenzlauer%20Allee;
        //    startplz=10405%2C%2010409;startc=11160%2C13492;
        //    zielc=14272%2C11775;zielname=Boxhagener%20Platz;zielplz=10245;
        //    pref_seen=1;pref_speed=20;pref_cat=;pref_quality=;pref_green=;pref_specialvehicle=;
        //    scope=;output_as=kml-track
        robot.http("http://www.bbbike.de/cgi-bin/bbbike.cgi?startname=hier;zielname=dort")
             //.path("cgi-bin/bbbike.cgi?"
             //        + "startname=" + response.match[1] + ";zielname=" + response.match[2])
             .get(
                 function(err, resp, body) {
                     console.log(err + "\n" + resp.statusCode + "\n" + body);
                     //if (err) {
                     //     response.reply("Error " + err);
                     //}

                     response.reply(test);
                    console.log(test);

                 }
             );
    }

    robot.respond(/route from (.*) to (.*)/i, responseFunction);
    robot.respond(/route von (.*) nach (.*)/i, responseFunction);
}
