const User = require("../models/user.model");

async function create(userData) {
    const user = new User(userData);
    await user.save();
    return user;
}

async function findByEmail(email) {
    return User.findOne({email});
}

async function updateLocation(userId, location) {
    return User.findByIdAndUpdate(userId, { location }, { new: true });
}

module.exports = {
    create,
    findByEmail
};