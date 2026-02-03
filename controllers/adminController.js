const { Article, Video } = require('../models/content');

exports.manageArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ 
            order: [['createdAt', 'DESC']] 
        });
        res.render('admin/articles', { articles, user: req.user, req });
    } catch (err) {
        res.status(500).send("Gagal memuat data");
    }
};

exports.postCreateArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Article.create({ title, content });
        res.redirect('/admin/articles');
    } catch (err) {
        res.status(500).send("Gagal menambah artikel");
    }
};

exports.postEditArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Article.update(
            { title, content },
            { where: { id: req.params.id } }
        );
        res.redirect('/admin/articles');
    } catch (err) {
        res.status(500).send("Gagal memperbarui artikel");
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        await Article.destroy({ 
            where: { id: req.params.id } 
        });
        res.redirect('/admin/articles');
    } catch (err) {
        res.status(500).send("Gagal menghapus artikel");
    }
};

exports.manageVideos = async (req, res) => {
    try {
        const videos = await Video.findAll({ order: [['createdAt', 'DESC']] });
        res.render('admin/videos', { videos, user: req.user, req });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.postCreateVideo = async (req, res) => {
    try {
        const { title, videoUrl } = req.body;
        await Video.create({ title, videoUrl });
        res.redirect('/admin/videos');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.postEditVideo = async (req, res) => {
    try {
        let { title, videoUrl } = req.body;
        await Video.update({ title, videoUrl }, { where: { id: req.params.id } });
        res.redirect('/admin/videos');
    } catch (err) {
        res.status(500).send("Gagal update video");
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        await Video.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/videos');
    } catch (err) {
        res.status(500).send("Gagal hapus video");
    }
};