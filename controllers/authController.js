const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).send("User sudah terdaftar");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: newUser.id, tier: newUser.membershipTier },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true });

        res.redirect('/');
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password salah" });

        const token = jwt.sign(
            { id: user._id, tier: user.membershipTier },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};