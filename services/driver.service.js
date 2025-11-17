const { updateDriverLocation } = require('./location.service');
const userRepository = require('../repositories/user.repository');

const updateLocation = async (driverId, location) => {
    const lat = parseFloat(location.latitude);
    const lon = parseFloat(location.longitude);
    try {
        const res = await updateDriverLocation(driverId, lat, lon);
        await userRepository.updateLocation(driverId, {
            type: 'Point',
            coordinates: [lon, lat]
        });
    } catch (error) {
        throw new Error('Failed to update driver location');
    }
}

module.exports = {
    updateLocation
};