const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", Controller.getCategories);
router.get("/:id", Controller.getCategoryById);
router.post("/", Controller.createCategory);
router.put("/:id", Controller.editCategoryById);
router.delete("/:id", Controller.deleteCategoryId);

module.exports = router;
