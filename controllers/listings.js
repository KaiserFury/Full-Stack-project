const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index.ejs", { allListing });
};

module.exports.newListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.saveNewListing = async (req, res, next) => {
  let newListingData = req.body;
  console.log(req.user._id);
  // Derive ownership from the authenticated session, never from submitted form data.
  newListingData.listing.owner = req.user._id;
  const newListing = new Listing(newListingData.listing);

  await newListing.save();
  req.flash("success", "New Property is added ");
  res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!listing) {
    req.flash(
      "error",
      "The Property you are try to reach might be deleted or does not exit! ",
    );
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  // If no listing is found for the given ID, show an error message
  // and redirect the user back to the listings page.
  if (!listing) {
    req.flash("error", "bkl manja! ");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req) req.flash("success", "Edit Successful ");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted Successful ");
  res.redirect("/listings");
};
