const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books_controller");
const reviewController = require("../controllers/reviews_controller");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

router.route("/")
  .get( bookController.getAllBooks)
  .post(verifyUser ,bookController.createBook)
  .delete(verifyUser, verifyAdmin, bookController.deleteAllBook);
// .put(bookController.updateBook);

router.use(verifyUser)
  .route("/:id")
  .get(bookController.getBookbyID)
  .post((req, res) => {
    res.status(501).send({ reply: "Not Implemented" });
  })
  .put(bookController.updateBookbyID)
  .delete(verifyAdmin, bookController.deleteBookbyID);

router.use(verifyUser)
  .route("/:id/reviews")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview)
  .put((req, res) => res.status(501).json({ reply: "Not Implemented" }))
  .delete(verifyAdmin,reviewController.deleteAllReviews);

router
  .route("/:id/reviews/:review_id")
  .get(reviewController.getReviewByID)
  .post((req, res) => res.status(501).json({ reply: "Not Implemented" }))
  .put(reviewController.updateReviewByID)
  .delete(reviewController.deleteReviewByID);

module.exports = router;
