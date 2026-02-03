const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

router.get("/articles", contentController.getArticles);
router.get("/videos", contentController.getVideos);
router.get("/dashboard", contentController.getMainDashboard);

module.exports = router;
