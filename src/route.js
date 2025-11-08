const express = require('express');
const router = express.Router();
const auth = require('./Middleware/auth');


const authController = require('./Controller/auth');
const bookingController = require('./Controller/booking');
const showController = require('./Controller/movie');

//-------------------|| USER AUTH ROUTES ||-------------------//
router.post('/auth/signup', authController.userSignUp);
router.post('/auth/login', authController.userLogin);

//-------------------|| MOVIE ROUTES ||-------------------//
router.get('/movies', showController.getMovies);
router.get('/movies/:movieId/shows', showController.getShowsByMovieId);
router.get('/shows/:showId', showController.getShowDetails);

//-------------------|| BOOKING ROUTES ||-------------------//
router.post('/bookings', auth, bookingController.createBooking);
router.get('/bookings/me', auth, bookingController.getMyBookings);

module.exports = router;