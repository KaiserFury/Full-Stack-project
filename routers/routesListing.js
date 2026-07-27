const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");
// Custom error class used for validated request failures and 404 responses
const ExpressError = require("../utils/ExpressError.js");
// Joi schema for listing and review validation
const { listingSchema } = require("../schema.js");

// import login middleware
const { isLoggedIn, isOwner } = require("../middleware.js");

// Validate incoming listing data before creating or updating a listing
// // Validate listing payload against Joi schema before create/update routesconst
const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error.details[0].message);
  } else {
    next();
  }
};

// Fetch all listings and render to template
// Index or show Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find();
    res.render("listings/index.ejs", { allListing });
  }),
);

// Render form to create a new listing
// New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Fetch and display a single listing data by MongoDB ID
// show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // Populate is mongose function
    const listing = await Listing.findById(id).populate({
      path: "reviews",
      populate: { path: "author" },
    }).populate("owner");
    if (!listing) {
      req.flash(
        "error",
        "The Property you are try to reach might be deleted or does not exit! ",
      );
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
  }),
);

// Create a new listing from form data and redirect to listings home page
// Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    let newListingData = req.body;
    console.log(req.user._id);
    newListingData.listing.owner = req.user._id; // Add the owner who created this listing
    const newListing = new Listing(newListingData.listing);

    await newListing.save();
    req.flash("success", "New Property is added ");
    res.redirect("/listings");
  }),
);

// Render form to edit an existing listing
// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    // If no listing is found for the given ID, show an error message
    // and redirect the user back to the listings page.
    if (!listing) {
      req.flash("error", "bkl manja! ");
      return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
  }),
);

// Update listing with form data and redirect to listing details
// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (req) req.flash("success", "Edit Successful ");
    res.redirect(`/listings/${id}`);
  }),
);

// Delete a listing by ID and return to the listings overview
// Delete Route
router.get(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted Successful ");
    res.redirect("/listings");
  }),
);

module.exports = router;
