const locationService = require("../services/location.service");

function initSocket(io) {
    io.on('connection', (socket) => {
        console.log('New socket connection:', socket.id);

        socket.on('registerDriver', async ({driverId}) => {
            if(!driverId) return;
            await locationService.setDriverSocket(driverId, socket.id);
            console.log(`Driver ${driverId} registered with socket ID ${socket.id}`);
        })
        

        socket.on('disconnect', async () => {
            console.log('Socket disconnected:', socket.id);
            locationService.deleteBySocket(socket.id);
        });
    });
}

module.exports = initSocket;