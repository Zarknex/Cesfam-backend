import Medicine from "../models/Medicine.js";

const getMedicine = async (req, res) => {
  const { id } = req.params;

  const medicine = await Medicine.findById(id);

  if (!medicine) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  res.json(medicine);
};

const getMedicines = async (req, res) => {
  const medicine = await Medicine.find()

  if (!medicine) {
    return res.status(404).json({
      msg: "No encontrado",
    });
  }
  res.json(medicine);
};

const editMedicine = async (req, res) => {
  const { id } = req.params;

  const medicine = await Medicine.findById(id);

  if (!medicine) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  //Code to edit
  medicine.description = req.body.description || medicine.description;
  medicine.stock = req.body.stock || medicine.stock;
  medicine.manufacturer = req.body.manufacturer || medicine.manufacturer;
  medicine.content = req.body.content || medicine.content;
  medicine.typeMedicine = req.body.typeMedicine || medicine.typeMedicine;

  try {
    const medicineStored = await medicine.save();
    res.json(medicineStored);
  } catch (error) {
    console.log(error);
  }
};

const newMedicine = async (req, res) => {
  const medicine = new Medicine(req.body);
  medicine._id = req.user._id;

  try {
    const medicineStored = await medicine.save();
    res.json(medicineStored);
  } catch (error) {
    console.log(error);
  }
};

const deleteMedicine = async (req, res) => {
  const { id } = req.params;

  const medicine = await Medicine.findById(id);

  if (!medicine) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await medicine.deleteOne();
    res.json({msg: "Prescripción eliminada"})
  } catch (error) {
    console.log(error);
  }
};
  
export {
  getMedicine,
  getMedicines,
  editMedicine,
  newMedicine,
  deleteMedicine,
};
