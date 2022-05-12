import express from "express";
import {
  getPrescription,
  getPrescriptions,
  editPrescription,
  newPrescription,
  deletePrescription,
} from "../controllers/prescriptionController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getPrescriptions)
  .post(checkAuth, newPrescription);

router
  .route("/:id")
  .get(checkAuth, getPrescription)
  .put(checkAuth, editPrescription)
  .delete(checkAuth, deletePrescription);
export default router;
