const bookingService = require('../services/booking.service');

const createBooking = async (req, res) => {
    try {
        const {source, destination} = req.body;
        const booking = await bookingService.createBooking({passengerId: req.user._id, source, destination});
        res.status(201).json({data: booking, message: 'Booking created successfully', success: true, error: null});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createBooking
};