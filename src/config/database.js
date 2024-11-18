const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sauravbedwal1234:LAxU7xXSS9gO09WJ@namastenodesauravbedwal.vwabz.mongodb.net/broomees"
  );
};

module.exports = connectDB;
