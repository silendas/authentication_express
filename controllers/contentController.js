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

exports.getArticleDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);

        if (!article) {
            return res.status(404).send('Artikel tidak ditemukan');
        }

        res.render('article-detail', { 
            article, 
            user: req.user
        });
    } catch (err) {
        res.status(500).send(err.message);
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