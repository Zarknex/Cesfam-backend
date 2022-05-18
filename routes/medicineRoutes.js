import express from "express";
import {
  getMedicine,
  getMedicines,
  newMedicine,
  editMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, getMedicines).post(checkAuth, newMedicine);

router
  .route("/:id")
  .get(checkAuth, getMedicine)
  .put(checkAuth, editMedicine)
  .delete(checkAuth, deleteMedicine);
export default router;
