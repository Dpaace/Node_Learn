const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categories_controller')

router.route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory)
  .put((req, res) => res.status(501).json({ reply: "Not Implemented" }))
  .delete(categoryController.deleteAllCategories);

router.route("/:category_id")
  .get(categoryController.getCategoryByID)
  .post(categoryController.updateCategoryByID)
  .put((req, res) => res.status(501).json({ reply: "Not Implemented" }))
  .delete(categoryController.deleteCategoryByID);

module.exports = router
