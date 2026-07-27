const express = require("express");
const router = express.Router({ mergeParams: true });

// Joi schema used to validate review form submissions
const { reviewSchema } = require("../schema.js");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");

// Custom error used when review validation fails
const ExpressError = require("../utils/ExpressError.js");

// Authentication and authorship guards for review mutations
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");

// Validate review input before saving it to the database
const validateReview = (req, res, next) => {
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    console.log(result);
    throw new ExpressError(400, result.error.details[0].message);
  } else {
    next();
  }
};

// Create a new review and attach it to the selected listing
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete a review and remove its reference from the parent listing
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;
