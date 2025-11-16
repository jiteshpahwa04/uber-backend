const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const {user, token} = await authService.register(req.body);
        res.status(201).json({data: {user, token}, message: 'User registered successfully', success: true, error: null});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const {user, token} = await authService.login(email, password);
        res.status(200).json({data: {user, token}, message: 'User logged in successfully', success: true, error: null});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    register,
    login
};