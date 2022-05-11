import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
