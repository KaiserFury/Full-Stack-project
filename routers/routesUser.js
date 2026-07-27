const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
// Pssport is a NPM package/library that help in building user authentication
const passport = require("passport");

// Utility wrapper to catch errors in async route handlers
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

// this route render the signup form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// This route usese passport library for saving user credentials.
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registereduser = await User.register(newUser, password);
      console.log(registereduser);
      req.login(registereduser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
      }); 
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }),
);

// this route render the login form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// this route allows to login and check for  correct password
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back");

    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  },
);

// Logged out route

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings")
    })
})

module.exports = router;
