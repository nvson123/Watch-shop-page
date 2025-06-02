const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Location", locationSchema);