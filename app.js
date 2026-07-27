const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const mdOverride = require("method-override");
// EJS-Mate enables layout templates for DRY HTML structure
const ejsMate = require("ejs-mate");
// Custom error class used for validated request failures and 404 responses
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");


// Listing routes for CRUD operations
const listingRouter = require("./routers/routesListing.js");
// Review routes for creating and deleting review entries
const reviewsRouter = require("./routers/routesReviews.js");
// User routes
const userRouter = require("./routers/routesUser.js");




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

// Sessions persist Passport authentication and flash messages for seven days.
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


app.use(passport.initialize());
app.use(passport.session());
// Expose flash messages and the authenticated user to every EJS view.

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentLoginStatus = req.user;
  next();
});







app.use("/listings", listingRouter); // listing CRUD routes
app.use("/listings/:id/reviews", reviewsRouter); // review CRUD routes
app.use("/", userRouter); //  User routes


passport.use( new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





// Catch-all route for unmatched paths, forwarding to the global error handler
app.all("/{*catchall}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Centralized error handler renders a friendly error page for all thrown errors
app.use((err, req, res, next) => {
  res.render("includes/error.ejs", { message: err.message });
});

app.listen(8080, () => {
  console.log("Server is 8080 running");
});
