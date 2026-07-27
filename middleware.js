const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You need to login first");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentLoginStatus._id)) {
          req.flash("error", "You are not the owner of this listing to make any change!");
          return res.redirect(`/listings/${id}`);
    
    }
    next();
};

// Allow review deletion only for the authenticated author.
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    console.log(await review.populate("author"))
    if(!review.author._id.equals(res.locals.currentLoginStatus._id)) {
          req.flash("error", "Only the creater of this reivew is allowed to delete it!");
          return res.redirect(`/listings/${id}`);
    
    }
    next();
};
