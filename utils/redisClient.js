const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

redisClient.connect();

module.exports = redisClient;