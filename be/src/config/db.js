const mongoose = require("mongoose");
const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};
