const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const mdOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
// Enable PUT/DELETE requests from HTML forms using _method query parameter
app.use(mdOverride("_method"));

// Async connection to MongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
}

main()
  .then(() => {
    console.log("Connection is successful with DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Working");
});

// Fetch all listings and render to template
app.get("/listings", async(req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index.ejs", {allListing});
});

// Render form to create a new listing
app.get("/listings/new", (req, res) => {
   res.render("listings/new.ejs");
});

// Fetch and display a single listing data by MongoDB ID
app.get("/listings/:id", async(req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

// Create a new listing from form data and redirect to listings home page
app.post("/listings", async(req, res) => {
  let newListingData = req.body;
  const newListing = new Listing(newListingData.listing);
  newListing.save();
  
  res.redirect("/listings");
}) ;

// Render form to edit an existing listing
app.get("/listings/:id/edit", async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
})

// Update listing with form data and redirect to listing details
app.put("/listings/:id", async(req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing})
  res.redirect(`/listings/${id}`); 
});


app.listen(8080, () => {
  console.log("Server is running");
});




