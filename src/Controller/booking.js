const mongoose = require('mongoose');
const Booking = require('../Model/bookingModel');
const Show = require('../Model/showModel');

exports.createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!showId || !seats)
      return res.status(400).send({ status: false, msg: 'showId and seats are required' });

    if (!mongoose.Types.ObjectId.isValid(showId))
      return res.status(400).send({ status: false, msg: 'Invalid showId' });

    const show = await Show.findById(showId);
    if (!show) return res.status(404).send({ status: false, msg: 'Show not found' });

    if (show.availableSeats < seats)
      return res.status(400).send({ status: false, msg: 'Not enough seats available' });

    show.availableSeats -= seats;
    await show.save();

    const booking = await Booking.create({
      userId: req.user._id,
      showId,
      seats,
    });

    return res.status(201).send({ status: true, msg: 'Booking successful', booking });

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }       
  }


exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({ path: 'showId', populate: { path: 'movieId' } })
      .sort('-bookingTime')
      .lean();

    if(bookings.length === 0) return res.status(404).send({ status: false, msg: 'No bookings found' });

    return res.status(200).send({status: true,msg: 'Bookings fetched successfully',bookings});

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: false, msg: 'Internal Server Error' });
  }
};
