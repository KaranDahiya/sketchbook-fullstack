const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

// make sure model name matches collection name
module.exports = mongoose.model("User", UserSchema);