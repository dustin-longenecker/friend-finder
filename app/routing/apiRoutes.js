var friendsData = require("../data/friends.js")
module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});
	app.post("/api/friends", function(req, res) {
		var friendMatch = {
			name: "",
			image: "",
			difference: 20
		};
		var newFriend = req.body;
		var userScores = newFriend.scores;
		var totalDiff = 0;
		for (var i = 0; i < friendsData.length; i++) {
			totalDiff = 0;
			for (var j = 0; j < friendsData[i].scores[j]; j++) {
				totalDiff += Math.abs(userScores[j]-friendsData[i].scores[j]);
				if (totalDiff<= friendMatch.difference) {
					friendMatch.name = friendsData[i].name;
					friendMatch.image = friendsData[i].photo;
					friendMatch.difference = totalDiff;
				}
			}
		}
		friendsData.push(newFriend);
		console.log(newFriend);
		res.json(friendMatch);
	});
};
