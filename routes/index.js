const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoute');
const contentRoute = require('./contentRoute');

router.use('/auth', authRoutes);

router.use('/content', contentRoute);

module.exports = router;