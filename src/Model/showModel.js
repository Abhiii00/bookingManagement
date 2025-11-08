const mongoose = require('mongoose');


const showSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    date: { type: String, required: true }, 
    time: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Show', showSchema);