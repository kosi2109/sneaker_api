const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  featureImage: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
  },
  releseDate: {
    type: Date,
    default: Date.now(),
  },
  option: [
    {
      color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
        required: true,
      },
      stock: [
        {
          size: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Size",
            required: true,
          },
          stock: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      images: {
        type: [String],
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
