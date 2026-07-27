const User = require("../models/user.js");

module.exports.signUp = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.createAccount = async (req, res, next) => {
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
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
  
};

module.exports.logIn = async (req, res) => {
  req.flash("success", "Welcome Back");

  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
