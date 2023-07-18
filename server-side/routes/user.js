const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

router.post("/register", authentication, Controller.register);
router.post("/login", Controller.login);

module.exports = router;
