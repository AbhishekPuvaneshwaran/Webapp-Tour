const express = require('express');
const router = express.Router();
const {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    searchTours
} = require('../controllers/tourController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllTours);
router.get('/search/:query', searchTours);
router.get('/:id', getTour);

// Admin routes
router.post('/', protect, admin, createTour);
router.put('/:id', protect, admin, updateTour);
router.delete('/:id', protect, admin, deleteTour);

module.exports = router;
