const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { fullName, email, password} = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User sudah terdaftar" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.redirect('/login');
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
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