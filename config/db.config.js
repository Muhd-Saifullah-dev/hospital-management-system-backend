const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.config");
const { DB_NAME } = require("../constant");
const path = require("path");
const fs = require("fs");
const MongoDatabaseConnection = async () => {
  try {
    const connection = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected to ${connection.connection.host}`);
    const modelPath = path.join(__dirname, "../models");
    fs.readdirSync(modelPath).forEach((file) => {
      if (file !== "index.js") {
        require(path.join(modelPath, file));
      }
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { MongoDatabaseConnection };
