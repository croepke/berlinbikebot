var nextLastFridayOfMonth = function(startDate) {
    console.log(startDate);
    var date = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1, 20, 0, 0, 0);
    console.log(date);
    date.setDate(date.getDate() - 1);
    while (date.getDay() != 5) {
        console.log(date);
        date.setDate(date.getDate() - 1);
    }
    if (date < startDate) {
        return nextLastFridayOfMonth(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1, 20, 0, 0, 0));
    }
    return date;
}

var formatNicely = function(cmDate) {
    return "Die nächste Critical Mass ist am " + cmDate.getDate() + "." + cmDate.getMonth() + ". um 20 Uhr";
}

module.exports = function(robot) {
    var responseFunction = function(response) {
        response.send(formatNicely(nextLastFridayOfMonth(new Date())))
    }

    robot.hear(/critical mass/ig, responseFunction);
}
