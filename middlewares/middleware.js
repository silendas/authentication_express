const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;
    
    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!req.user) {
            return res.redirect('/login');
        }
        
        next(); 
    } catch (err) {
        console.error("Token Error:", err);
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

module.exports = { protect };