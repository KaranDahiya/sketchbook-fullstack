const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
    title: String,
    category: String,
    date: String,
    imageURL: String
});

// make sure model name matches collection name
module.exports = mongoose.model("Artwork", ArtworkSchema);