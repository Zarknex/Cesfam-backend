import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    patientId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    patientName: {
      type: String,
      trim: true,
      required: true,
    },
    patientLastName: {
      type: String,
      trim: true,
      required: true,
    },
    agePatient: {
      type: String,
      trim: true,
      required: true,
    },
    sexPatient: {
      type: String,
      trim: true,
      required: true,
    },
    rutPatient: {
      type: String,
      trim: true,
      required: true,
    },
    diagnosticPatient: {
      type: String,
      trim: true,
      required: true,
    },
    idMedicinePatient: {
      type: Array
    }
    ,
    dosePatient: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
