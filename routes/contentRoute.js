const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

router.get("/articles", contentController.getArticles);
router.get("/articles/:id", contentController.getArticleDetail);

router.get("/videos", contentController.getVideos);
router.get("/", contentController.getMainDashboard);

module.exports = router;
