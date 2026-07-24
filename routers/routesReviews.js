const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Joi schema used to validate review form submissions
const { reviewSchema } = require("../schema.js");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");

// Custom error class used for validated request failures and 404 responses
const ExpressError = require("../utils/ExpressError.js");






// Validate review input before saving it to the database
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


// Create a new review and attach it to the selected listing
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
  req.flash("success", "New Review Added"); 
  res.redirect(`/listings/${id}`);
}));

// Delete a review and remove its reference from the parent listing
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted"); 
  res.redirect(`/listings/${id}`);

}));


module.exports = router;