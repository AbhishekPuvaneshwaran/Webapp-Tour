const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    getAllBookings,
    deleteBooking
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

// All booking routes require authentication
router.post('/', protect, createBooking);
router.get('/mybookings', protect, getUserBookings);
router.delete('/:id', protect, deleteBooking);

// Admin only
router.get('/', protect, admin, getAllBookings);

module.exports = router;
