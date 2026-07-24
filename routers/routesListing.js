const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");


// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");
// Custom error class used for validated request failures and 404 responses
const ExpressError = require("../utils/ExpressError.js");
// Joi schema for listing and review validation
const {listingSchema } = require("../schema.js");





// Validate incoming listing data before creating or updating a listing
// // Validate listing payload against Joi schema before create/update routesconst validateListing = (req, res, next) => {
const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error.details[0].message);
  }
  else {
    next();
  }
};


// Fetch all listings and render to template
// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find();
    res.render("listings/index.ejs", { allListing });
  }),
);

// Render form to create a new listing
// New Route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Fetch and display a single listing data by MongoDB ID
// show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
      req.flash("error", "The Property you are try to reach might be deleted or does not exit! "); 
      return res.redirect("/listings");
    };

    res.render("listings/show.ejs", { listing });
  }),
);

// Create a new listing from form data and redirect to listings home page
// Create Route
router.post("/",validateListing, wrapAsync(async(req, res, next) => {
  let newListingData = req.body;
  const newListing = new Listing(newListingData.listing);
  await newListing.save();
  req.flash("success", "New Property is added "); 
  res.redirect("/listings");
})) ;

// Render form to edit an existing listing
// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
      req.flash("error", "bkl! "); 
      return res.redirect("/listings");
    };

  res.render("listings/edit.ejs", {listing});
}));

// Update listing with form data and redirect to listing details
// Update Route
router.put("/:id",validateListing, wrapAsync(async(req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing})
  
  req.flash("success", "Edit Successful "); 
  res.redirect(`/listings/${id}`); 
}));

// Delete a listing by ID and return to the listings overview
// Delete Route
router.get("/:id/delete",wrapAsync( async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted Successful "); 
  res.redirect("/listings");
}));

module.exports = router;