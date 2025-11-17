const {redisClient} = require('../utils/redisClient');

class locationService {
    async updateDriverLocation(driverId, latitude, longitude) {
        try {
            await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                longitude.toString(),
                latitude.toString(),
                driverId.toString()
            ])
        } catch (error) {
            console.error('Error updating driver location in Redis:', error);
        }
    }

    async findNearbyDrivers(longitude, latitude, radiusInKm) {
        try {
            const driverIds = await redisClient.sendCommand([
                'GEORADIUS',
                'drivers',
                longitude.toString(),
                latitude.toString(),
                radiusInKm.toString(),
                'km',
                'WITHCOORD'
            ]);
            return driverIds.map(id => ({ _id: id }));
        } catch (error) {
            console.error('Error finding nearby drivers in Redis:', error);
            return [];
        }
    }

    async setDriverSocket(driverId, socketId) {
        await redisClient.set(`driver:${driverId}`, socketId);
    }

    async getDriverSocket(driverId) {
        return await redisClient.get(`driver:${driverId}`);
    }

    async deleteDriverSocket(driverId) {
        await redisClient.del(`driver:${driverId}`);
    }

    async deleteBySocket(socketId) {
        this.deleteDriverSocket(redisClient.get(socketId));
    }
}

module.exports = new locationService();