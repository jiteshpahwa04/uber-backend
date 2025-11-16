const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userRepo.findById(verified.id);
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = authMiddleware;