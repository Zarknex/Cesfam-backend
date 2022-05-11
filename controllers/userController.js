import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
  const { username } = req.body;
  const existUser = await User.findOne({ username });

  if (existUser) {
    const error = new Error("El correo ya se encuentra registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    console.log(user);
    const userStored = await user.save();
    res.json(userStored);
  } catch (error) {
    console.log(error);
  }
};

const auth = async (req, res) => {
  const { username, password } = req.body;

  //User exists comprobation
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("El usuario no se encuentra registrado");
    return res.status(404).json({ msg: error.message });
  }

  //User confirmated comprobation
  if (!user.confirmated) {
    const error = new Error("La cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  if (await user.confirmPass(password)) {
    res.json({
      _id: user._id,
      user: user.username,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmated = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const forgotPass = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El correo no se encuentra registrado");
    return res.status(404).json({ msg: error.message });
  }
  try {
    user.token = generateId();
    await user.save();
    res.json({ msg: "Hemos enviado un correo con instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const confirmMailToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

const newPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Contaseña actualizada" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export {
  register,
  auth,
  confirm,
  forgotPass,
  confirmMailToken,
  newPass,
  profile,
};
