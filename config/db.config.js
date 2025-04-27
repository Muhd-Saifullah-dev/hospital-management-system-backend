const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.config");
const { DB_NAME } = require("../constant");

const MongoDatabaseConnection = async () => {
  try {
    const connection = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { MongoDatabaseConnection };
