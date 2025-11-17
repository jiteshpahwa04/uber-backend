const driverService = require('../services/driver.service');

const updateDriverLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if(typeof latitude !== 'number' || typeof longitude !== 'number') {
            throw new Error('Invalid latitude or longitude');
        }

        await driverService.updateLocation(req.user._id, { latitude, longitude });
        
        res.status(200).json({ message: 'Location updated successfully', data: { latitude, longitude }, success: true, error: null });
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
}

module.exports = {
    updateDriverLocation
};