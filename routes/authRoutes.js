const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }), 
    (req, res) => {
        const token = jwt.sign(
            { id: req.user.id, tier: req.user.membershipTier }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/'); 
    }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', 
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }), 
    (req, res) => {
        const token = jwt.sign(
            { id: req.user.id, tier: req.user.membershipTier }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/'); 
    }
);

module.exports = router;