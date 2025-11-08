const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    seats: { type: Number, required: true },
    bookingTime: { type: Date, default: Date.now }
}, { timestamps: true });


module.exports = mongoose.model('Booking', bookingSchema);