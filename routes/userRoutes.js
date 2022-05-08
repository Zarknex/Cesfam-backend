import express from "express";
const router = express.Router();
import { register, auth } from "../controllers/userController.js";

//Autenticación, registro y confirmación de usuarios
router.post('/', register); // Registrar nuevo usuario
router.post('/login', auth);

export default router;