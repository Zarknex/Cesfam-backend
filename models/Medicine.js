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
      type: String,
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
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
