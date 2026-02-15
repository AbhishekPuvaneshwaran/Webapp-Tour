const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json({
            success: true,
            count: tours.length,
            data: tours
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new tour
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(201).json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json({
            success: true,
            message: 'Tour deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search tours
// @route   GET /api/tours/search/:query
// @access  Public
exports.searchTours = async (req, res) => {
    try {
        const tours = await Tour.find({
            $or: [
                { title: { $regex: req.params.query, $options: 'i' } },
                { location: { $regex: req.params.query, $options: 'i' } },
                { category: { $regex: req.params.query, $options: 'i' } }
            ]
        });
        res.json({
            success: true,
            count: tours.length,
            data: tours
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
