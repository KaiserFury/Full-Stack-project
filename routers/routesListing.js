const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");
// Custom error used when listing validation fails
const ExpressError = require("../utils/ExpressError.js");
// Joi schema for listing payload validation
const { listingSchema } = require("../schema.js");

// Authentication and ownership guards for listing mutations
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Reject invalid payloads before controller and database work
const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error.details[0].message);
  } else {
    next();
  }
};

// Fetch all listings and render to template
router.get("/", wrapAsync(listingController.index));

// Render form to create a new listing
router.get("/new", isLoggedIn, listingController.newListingForm);

// Create a listing and redirect to the listing catalog
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.saveNewListing),
);

// Fetch and display a single listing data by MongoDB ID
router.get("/:id", wrapAsync(listingController.show));

// Render form to edit an existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// Update listing with form data and redirect to listing details
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

// Delete a listing by ID and return to the listings overview
router.get(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing),
);

module.exports = router;
