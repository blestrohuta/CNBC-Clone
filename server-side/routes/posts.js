const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", Controller.getPosts);
router.get("/:id", Controller.getPostById);
router.post("/", Controller.createPostWithTag);
router.put("/:id", Controller.editPostById);
router.delete("/:id", Controller.deletePostById);

module.exports = router;
