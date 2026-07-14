// Import required packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");

// Set up view engine and views folder for EJS templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded(path.join(__dirname, "views")));

// Connect to MongoDB when the app starts
main()
  .then(() => {
    console.log("Connection is successful with DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust");
}

// Home route
app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/listings", async(req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index.ejs", {allListing});
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log("Server is running");
});
