const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/Users";

const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("SuccessFully Connected to MongoDb");
  } catch (error) {
    console.log("Error Connecting to the MongoDb");
  }
};

module.exports = dbConnect;
