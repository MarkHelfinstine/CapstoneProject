const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  distance: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  elevation: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  age: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;
