const { Article, Video } = require('../models/content');

const getLimitByTier = (tier) => {
    if (tier === 'A') return 3;
    if (tier === 'B') return 10;
    return null;
};

exports.getArticles = async (req, res) => {
    try {
        const limit = getLimitByTier(req.user.membershipTier);
        const articles = await Article.findAll({ limit: limit });
        res.render('articles', { user: req.user, articles });
    } catch (err) {
        res.status(500).send("Error loading articles");
    }
};

exports.getVideos = async (req, res) => {
    try {
        const limit = getLimitByTier(req.user.membershipTier);
        const videos = await Video.findAll({ limit: limit });
        res.render('videos', { user: req.user, videos });
    } catch (err) {
        res.status(500).send("Error loading videos");
    }
};

exports.getMainDashboard = (req, res) => {
    res.render('dashboard', { user: req.user });
};