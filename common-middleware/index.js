const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: no token provided' });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(token);
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
            return res.status(400).json({ message: "Admin access denied" });
    }
    next();
};