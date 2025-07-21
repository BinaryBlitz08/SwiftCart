import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"], // Custom error message
    unique: true,
    trim: true, // Trim whitespace from beginning and end
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price must be 0 or greater"], // Ensure non-negative price
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Product stock must be 0 or greater"], // Ensure non-negative stock
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    }, // Ensure stock is an integer
  },
  images: {
    type: [String], // Ensure at least one image URL is provided
  },
   category: {
    type: String,
    enum: ['recommended', 'new', 'top-deal', 'sofa', 'bed', 'table', 'chair', 'kitchen'],
    required: true
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isRecommended: {
    type: Boolean,
    default: false
  },
  isTopDeal: {
    type: Boolean,
    default: false
  }

});


const Product = mongoose.model("Product", ProductSchema);
export default Product;
