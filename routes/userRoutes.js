import express from "express";
const router = express.Router();
import {
  register,
  auth,
  confirm,
  forgotPass,
  confirmMailToken,
  newPass,
  profile,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  sendMail
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

//Autenticación, registro y confirmación de usuarios
router.post("/register", register); // Registrar nuevo usuario
router.post("/login", auth); // Autenticar cuentas
router.get("/confirm/:token", confirm); //Se confirma la cuenta mediante un token y comparandolo
router.post("/forgot-password", forgotPass); //Se envia correo
router.route("/forgot-password/:token").get(confirmMailToken).post(newPass); //Se recibe el token y luego se crea una nueva contraseña
router.get("/list", getUsers);
router.get("/profile", checkAuth, profile);
router.post("/mail", sendMail);

router
  .route("/:id")
  .get(checkAuth, getUser)
  .put(checkAuth, editUser)
  .delete(checkAuth, deleteUser);

export default router;
