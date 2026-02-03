const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/middleware');
const { protect } = require('../middlewares/middleware');

router.use(protect, isAdmin);

router.get('/articles', adminController.manageArticles);        
router.post('/articles/create', adminController.postCreateArticle); 
router.post('/articles/edit/:id', adminController.postEditArticle);
router.post('/articles/delete/:id', adminController.deleteArticle);

router.get('/videos', adminController.manageVideos);
router.post('/videos/create', adminController.postCreateVideo);
router.post('/videos/edit/:id', adminController.postEditVideo);
router.post('/videos/delete/:id', adminController.deleteVideo);

module.exports = router;