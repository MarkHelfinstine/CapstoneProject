const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  gender: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  strava: {
    type: String
  },
  age: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  }
});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
