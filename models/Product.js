import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      trim: true,
      required: true,
    },
    manufacturer: {
      type: String,
      trim: true,
      required: true
    },
    content: {
      type: String,
      trim: true,
      required: true
    },
    typeMedicine: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
