const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const user = require("./user");
const customer = require("./customer");
const posts = require("./posts");
const categories = require("./categories");
const tags = require("./tags");

router.use("/customers", customer);
router.use("/users", user);
router.use(authentication);
router.use("/users/posts", posts);
router.use("/users/categories", categories);
router.use("/users/tags", tags);
router.use(errorHandler);

module.exports = router;
