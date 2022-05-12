import Prescription from "../models/Prescription.js";

const getPrescription = async (req, res) => {
  const { id } = req.params;

  const prescription = await Prescription.findById(id);

  if (!prescription) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  res.json(prescription);
};

const getPrescriptions = async (req, res) => {
  const prescription = await Prescription.find()
    .where("doctorId")
    .equals(req.user);

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
    const error = new Error("Acción no vlida");
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
  const prescription = new Prescription(req.body);
  prescription.doctorId = req.user._id;

  try {
    const prescriptionStored = await prescription.save();
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
