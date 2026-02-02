const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { session: false }), 
    (req, res) => {
        res.status(200).json({
            message: "Berhasil Daftar/Login via Google!",
            user: {
                nama: req.user.fullName,
                tier: req.user.membershipTier
            }
        });
    }
);

module.exports = router;