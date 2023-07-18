const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/posts", Controller.getPosts);
router.get("/posts/:id", Controller.getPostById);

module.exports = router;
