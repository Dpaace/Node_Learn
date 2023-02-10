const Category = require("../models/Category");

const getAllCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch(next);
};

const createCategory = (req, res, next) => {
  Category.create(req.body)
    .then((categories) => {
      res.status(201).json(categories);
    })
    .catch(next);
};

const deleteAllCategories = (req, res, next) => {
  Category.deleteMany()
    .then((categories) => {
      res.json(categories);
    })
    .catch(console.log);
};

const getCategoryByID = (req, res, next) => {
  Category.findById(req.params.category_id)
    .populate('books')
    .then((category) => {
      res.json(category);
    })
    .catch(next);
};

const updateCategoryByID = (req, res, next) => {
  Category.findByIdAndUpdate(
    req.params.category_id,
    { $set: req.body },
    { new: true }
  ).then((category) => {
      res.json(category);
    })
    .catch(next);
};

const deleteCategoryByID = (req, res, next) => {
  Category.findByIdAndDelete(req.params.category_id)
    .then((reply) => {
      res.json(reply);
    })
    .catch(next);
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteAllCategories,
  getCategoryByID,
  updateCategoryByID,
  deleteCategoryByID,
};
