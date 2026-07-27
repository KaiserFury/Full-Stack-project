const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Clear existing data and seed fresh sample listings
// Pattern: deleteMany({}) followed by insertMany() ensures consistent initial state
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner:  '6a64bda5069cbf431219a2e6'}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();