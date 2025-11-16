const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        required: false
    },
    source: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    destination: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    fare: Number,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    feedback: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;