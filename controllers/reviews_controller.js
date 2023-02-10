const Book = require("../models/Book");

const getAllReviews = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.json(book.reviews);
    })
    .catch(next);
};

const createReview = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      // console.log(req.body)
      // console.log(req.user)
      // Change this to have reviewer id as well
      let review = {
        body: req.body.body,
        reviewer: req.user.userId,
      };
      book.reviews.push(review);
      book.save().then((b) => res.status(201).json(b.reviews));
    })
    .catch(next);
};

const deleteAllReviews = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.reviews = [];
      book.save().then((b) => res.json(b.reviews));
    })
    .catch(next);
};

// Book.findById(req.params.id)
//     .then((book)=>{
//       res.json(book)
//     }).catch(next)

const getReviewByID = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let review = book.reviews.find((item) => item.id == req.params.review_id);
      res.json(review);
    })
    .catch(next);
};

const updateReviewByID = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let review = book.reviews.id(req.params.review_id)
      if(review.reviewer != req.user.userId) {
        res.status(403)
        return next(new Error("Not Authorized."))
      }
      let updatedReviews = book.reviews.map((item) => {
        if (item.id == req.params.review_id) {
          if (item.reviewer == req.user.userId) {
            item.body = req.body.body;
          }
        }
        return item;
      });
      book.reviews = updatedReviews;
      book.save().then((b) => res.json(b.reviews));
      // res.json(updatedReviews)
    })
    .catch(next);
};

const deleteReviewByID = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      let review = book.reviews.id(req.params.review_id)
      if(review.reviewer != req.user.userId) {
        res.status(403)
        return next(new Error("Not Authorized."))
      }
      let updatedReview = book.reviews.filter(
        (item) => item.id != req.params.review_id
      );
      book.reviews = updatedReview;
      book.save().then((b) => res.json(b.reviews));
      // res.json(updatedReviews)
    })
    .catch(next);
};

module.exports = {
  getAllReviews,
  createReview,
  deleteAllReviews,
  getReviewByID,
  updateReviewByID,
  deleteReviewByID,
};
