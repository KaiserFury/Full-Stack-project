const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


// Custom error used when the parent listing no longer exists.
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;

  let property = await Listing.findById(id);

  if (!property) {
    throw new ExpressError(404, "Listing not found");
  }

  let newReview = new Review(req.body.reviews);
  // Derive authorship from the authenticated session, never from submitted form data.
  newReview.author = req.user._id;
  // Keep the newest reviews first on the listing page.
  property.reviews.unshift(newReview);
  await newReview.save();
  await property.save();
  req.flash("success", "New Review Added");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
