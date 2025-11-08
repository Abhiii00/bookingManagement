const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    language: String,
    genre: String
}, { timestamps: true });


module.exports = mongoose.model('Movie', movieSchema);