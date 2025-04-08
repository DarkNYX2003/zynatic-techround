const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authorized' });

    try {
        const decodedJwt = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = await User.findById(decodedJwt.id).select('-password');
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};