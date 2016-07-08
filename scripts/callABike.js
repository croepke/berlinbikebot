// get the closest DB Call A Bike station

fs = require('fs');

module.exports = function(robot) {
    // simple squared euclidean distance! TODO use proper sphere distance
    var distance = function(latA, lngA) {
        return function (latB, lngB) {
            return Math.pow(parseFloat(latA) - parseFloat(latB), 2)
                      + Math.pow(parseFloat(lngA) - parseFloat(lngB), 2);
        }
    }

    var getStation = function(distanceFunc, reportFunc) {
        fs.readFile("data/HACKATHON_RENTAL_ZONE_CALL_A_BIKE.csv", "ascii", function (err, data) {
            if (err) {
                console.log(err);
            }

            var stationName = "";
            var stationDistance = Number.MAX_VALUE;
            var stationLat;
            var stationLng;

            var lines = data.toString().split("\n");
            for (var i = 1; i < lines.length; i++) {
                var values = lines[i].split(";");
                var lng = values[18];
                var lat = values[19];
                if (lng !== undefined && lat !== undefined) {
                    latSafe = lat.replace(/\"/g, '').replace(',','.');
                    lngSafe = lng.replace(/\"/g, '').replace(',','.');
                    var d = distanceFunc(latSafe, lngSafe);
                    if (d < stationDistance) {
                        stationDistance = d;
                        stationName = values[11];
                        stationLat = latSafe;
                        stationLng = lngSafe;
                    }
                }
            }
            reportFunc(stationName, stationLat, stationLng);
        });
    }

    var responseFunction = function(response) {
        // get the station closest to Fab Lab
        getStation(distance("52.5295312", "13.4191371"), function(station, lat, lng) {
            response.send(
                "Die nächste Call A Bike Station ist: " + station + "\n" +
                "http://maps.google.com/maps?q=loc:" + lat + "," + lng
                );
        });
    }

    robot.hear(/call a bike/ig, responseFunction);
}
