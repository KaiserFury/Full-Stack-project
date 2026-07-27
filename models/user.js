const { required } = require("joi");
const mongoose = require("mongoose");

// Extract the actual plugin function from the default export
const { default: passportLocalMongoose } = require("passport-local-mongoose");
const Schema = mongoose.Schema; 

// User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

// Add username, password hash & authentication methods to the schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

