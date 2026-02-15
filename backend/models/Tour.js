const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tour must have a title'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Tour must have a location'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Tour must have a price'],
        min: 0
    },
    description: {
        type: String,
        required: [true, 'Tour must have a description'],
        trim: true
    },
    image: {
        type: String,
        default: 'default-tour.jpg'
    },
    duration: {
        type: String,
        default: '1 Day'
    },
    category: {
        type: String,
        enum: ['Adventure', 'Beach', 'Cultural', 'Wildlife', 'Mountain', 'City'],
        default: 'Adventure'
    },
    maxGroupSize: {
        type: Number,
        default: 10
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tour', tourSchema);
