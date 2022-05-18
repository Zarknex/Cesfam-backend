import Prescription from "../models/Prescription.js";
import User from "../models/User.js";

const getPrescription = async (req, res) => {
  const { id } = req.params;

  const prescription = await Prescription.findById(id).populate("patientId ");


  if (!prescription) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  res.json(prescription);
};

const getPrescriptions = async (req, res) => {
  const prescription = await Prescription.find()
    .where("doctorId")
    .equals(req.user).select("-patientId");

  if (!prescription) {
    return res.status(404).json({
      msg: "No encontrado",
    });
  }
  res.json(prescription);
};

const editPrescription = async (req, res) => {
  const { id } = req.params;

  const prescription = await Prescription.findById(id);

  if (!prescription) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (prescription.doctorId.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ msg: error.message });
  }
  
  prescription.patientName = req.body.patientName || prescription.patientName;
  prescription.patientLastName = req.body.patientLastName || prescription.patientLastName;
  prescription.agePatient = req.body.agePatient || prescription.agePatient;
  prescription.sexPatient = req.body.sexPatient || prescription.sexPatient;
  prescription.rutPatient = req.body.rutPatient || prescription.rutPatient;
  prescription.diagnosticPatient = req.body.diagnosticPatient || prescription.diagnosticPatient;
  prescription.idMedicinePatient = req.body.idMedicinePatient || prescription.idMedicinePatient;
  prescription.dosePatient = req.body.dosePatient || prescription.dosePatient;

  try {
    const prescriptionStored = await prescription.save();
    res.json(prescriptionStored);
  } catch (error) {
    console.log(error);
  }
};

const newPrescription = async (req, res) => {
  const { patientId } = req.body;

  const existsPrescription = await User.findById(patientId);

  if (!existsPrescription) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const prescriptionStored = await Prescription.create(req.body);
    console.log(prescriptionStored._id);
    // Almacenar el ID en el proyecto

    existsPrescription.prescriptions.push(prescriptionStored._id);
    await existsPrescription.save();
    res.json(prescriptionStored);
  } catch (error) {
    console.log(error);
  }
};


const deletePrescription = async (req, res) => {
  const { id } = req.params;

  const prescription = await Prescription.findById(id);

  if (!prescription) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (prescription.doctorId.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no vlida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await prescription.deleteOne();
    res.json({msg: "Prescripción eliminada"})
  } catch (error) {
    console.log(error);
  }
};
  
export {
  getPrescription,
  getPrescriptions,
  editPrescription,
  newPrescription,
  deletePrescription,
};
