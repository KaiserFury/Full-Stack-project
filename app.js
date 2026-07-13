const express = require("express");
const app  = express();
const mongoose = require("mongoose");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded(path.join(__dirname, "views")));