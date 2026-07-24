const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Joi schema for listing and review validation
const { reviewSchema } = require("../schema.js");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");

// Custom error class used for validated request failures and 404 responses
const ExpressError = require("../utils/ExpressError.js");






// This Validation fuction prevents from empty comment submitions
const validateReview = (req, res, next) => {
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    console.log(result);
    throw new ExpressError(400, result.error.details[0].message);
    
  }
  else {
    next();
  }
};


// Add the reviews and display on show.ejs 
router.post("/", validateReview, wrapAsync(async (req, res) => {
  let { id } = req.params;

  let property = await Listing.findById(id);

  if (!property) {
    throw new ExpressError(404, "Listing not found");
  }

  let newReview = new Review(req.body.reviews);
  property.reviews.push(newReview);
  await newReview.save();
  await property.save();
  res.redirect(`/listings/${id}`);
}));

// This route help in deleting the reviews
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);

}));


module.exports = router;