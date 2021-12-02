const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
});

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
