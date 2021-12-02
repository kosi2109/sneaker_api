const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  hex: {
    type: String,
    required: true,
  },
});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
