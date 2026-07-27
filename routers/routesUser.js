const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.js");

// Passport Local authenticates login form submissions
const passport = require("passport");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");


router.route("/signup")
  .get(userController.signUp) // Render the signup form
  .post(wrapAsync(userController.createAccount));



router.route("/login")
  .get((req, res) => {  // Render the login form
  res.render("users/login.ejs");
  })
  .post(   // Authenticate credentials and resume the saved destination on success
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.logIn,
);
// End the current Passport session

router.get("/logout", userController.logOut);

module.exports = router;
