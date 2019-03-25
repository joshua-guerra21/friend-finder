var friends = require("../data/friends");

module.exports = function(app) {
    app.get ("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        console.log(req.body.scores);
        var user = req.body;
        
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var bestFriendIndex = 0;
        var minimumDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var g = 0; g < friends[i].scores.length; g++) {
                var difference = Math.abs(user.scores[g] - friends[i].scores[g]);
                totalDifference += difference;
            }

        if(totalDifference < minimumDifference) {
            bestFriendIndex = 1
            minimumDifference = totalDifference;
        }
        }

        friends.push(user);
        res.json(friends[bestFriendIndex]);
    });
};