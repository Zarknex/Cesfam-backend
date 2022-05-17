import mongoose from "mongoose";

const medicineSchema = mongoose.Schema(
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
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    typeMedicine: {
      type: String,
      trim: true,e
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
