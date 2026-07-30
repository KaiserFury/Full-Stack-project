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


const {storage, cloudinary } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });


// Reject invalid payloads before controller and database work
const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error.details[0].message);
  } else {
    next();
  }
};

router
  .route("/")
  .get(wrapAsync(listingController.index)) // Fetch all listings and render to template
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.saveNewListing), // Create a listing and redirect to the listing catalog
  );
  
// Render form to create a new listing
router.get("/new", isLoggedIn, listingController.newListingForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) // Fetch and display a single listing data by MongoDB ID
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing), // Update listing with form data and redirect to listing details
  );

// Render form to edit an existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// Delete a listing by ID and return to the listings overview
router.get(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing),
);

module.exports = router;
