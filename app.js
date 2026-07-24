const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const mdOverride = require("method-override");
// EJS-Mate enables layout templates for DRY HTML structure
const ejsMate = require("ejs-mate");
// Custom error class used for validated request failures and 404 responses
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
// Listing routes for CRUD operations
const listings = require("./routers/routesListing.js");
// Review routes for creating and deleting review entries
const reviews = require("./routers/routesReviews.js");
const session = require("express-session");
const flash = require("connect-flash");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// Enable PUT/DELETE requests from HTML forms using _method query parameter
app.use(mdOverride("_method"));
// Use EJS-Mate as the templating engine for layout support
app.engine("ejs", ejsMate);
// Serve static files (CSS, images, etc.) from public directory
app.use(express.static(path.join(__dirname, "/public")));

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

// Session configuration for flash messages and future auth-related state
const sessionOption = {
  secret: "Mysecret",
  resave: false,
  saveUninitialized : true,
  cookie: {
    expires: Date.now()+7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
  },
}
app.get("/", (req, res) => {
  res.send("Working");
});


app.use(session(sessionOption));
app.use(flash());

// Make flash messages available to all EJS templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});




app.use("/listings", listings); // listing CRUD routes
app.use("/listings/:id/reviews", reviews); // review CRUD routes







// Catch-all route for unmatched paths, forwarding to the global error handler
// Catch all unmatched routes and forward to global error handler
app.all("/{*catchall}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Centralized error handler renders a friendly error page for all thrown errors
app.use((err, req, res, next) => {
  res.render("includes/error.ejs", { message: err.message });
  // res.status(err.statusCode || 500).send(err.message || "something went wrong");
});

app.listen(8080, () => {
  console.log("Server is 8080 running");
});
