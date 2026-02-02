const express = require('express');
const router = express.Router();
const { checkMembership } = require('../middlewares/auth');

router.get('/artikel-dasar', checkMembership('A'), (req, res) => {
    res.json({ data: "Ini adalah 3 artikel dasar untuk tipe A" });
});

router.get('/artikel-menengah', checkMembership('B'), (req, res) => {
    res.json({ data: "Ini adalah 10 artikel untuk tipe B" });
});

router.get('/artikel-premium', checkMembership('C'), (req, res) => {
    res.json({ data: "Ini adalah akses penuh seluruh artikel untuk tipe C" });
});

module.exports = router;