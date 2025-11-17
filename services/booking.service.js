const { create } = require('../models/booking.model');
const { haversineDistance } = require('../utils/distance');
const locationService = require('./location.service');

const BASIC_FARE = 50; // base fare in currency units
const PER_KM_RATE = 10; // rate per kilometer in currency units
async function createBooking(bookingData) {
    const distance = haversineDistance(
        bookingData.source.coordinates[1],
        bookingData.source.coordinates[0],
        bookingData.destination.coordinates[1],
        bookingData.destination.coordinates[0]
    );
    const fare = BASIC_FARE + (distance * PER_KM_RATE);
    const finalBookingData = {
        passenger: bookingData.passengerId,
        source: bookingData.source,
        destination: bookingData.destination,
        status: 'REQUESTED',
        fare
    }
    return await create(finalBookingData);
}

async function findNearbyDrivers(source, radiusInKm = 5) {
    const latitude = parseFloat(source.coordinates[1]);
    const longitude = parseFloat(source.coordinates[0]);

    const nearbyDrivers = await locationService.findNearbyDrivers(longitude, latitude, radiusInKm);
    return nearbyDrivers;
}

module.exports = {
    createBooking,
    findNearbyDrivers
};