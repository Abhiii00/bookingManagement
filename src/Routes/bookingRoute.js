const express = require('express');
const mongoose = require('mongoose');
const auth = require('../Middleware/auth');
const Booking = require('../models/Booking');
const Show = require('../models/Show');


const router = express.Router();


// POST /bookings (Protected)
router.post('/', auth, async (req, res) => {
const { showId, seats } = req.body;
if (!showId || !seats) return res.status(400).json({ error: 'showId and seats are required' });
if (!mongoose.Types.ObjectId.isValid(showId)) return res.status(400).json({ error: 'Invalid showId' });
const show = await Show.findById(showId);
if (!show) return res.status(404).json({ error: 'Show not found' });
if (show.availableSeats < seats) return res.status(400).json({ error: 'Not enough seats available' });


// Atomic update using transaction (recommended for production) - simple approach here
show.availableSeats -= seats;
await show.save();


const booking = await Booking.create({ userId: req.user._id, showId, seats });
res.status(201).json({ message: 'Booking successful', booking });
});


// GET /bookings/my (Protected)
router.get('/my', auth, async (req, res) => {
const bookings = await Booking.find({ userId: req.user._id })
.populate({ path: 'showId', populate: { path: 'movieId' } })
.sort('-bookingTime')
.lean();
res.json(bookings);
});


module.exports = router;