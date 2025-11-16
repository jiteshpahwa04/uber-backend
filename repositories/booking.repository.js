const Booking = require("../models/booking.model");

async function create(bookingData) {
    const booking = new Booking(bookingData);
    await booking.save();
    return booking;
}

module.exports = {
    create
};