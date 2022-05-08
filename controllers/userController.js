import User from "../models/User.js";
import generateId from "../helpers/generateId.js";

const register = async (req, res) => {
  const { username } = req.body;
  const existUser = await User.findOne({ username });
  
  if(existUser) {
    const error = new Error('El usuario ya se encuentra registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    console.log(user);
    const userStored = await user.save();
    res.json(userStored)
  } catch (error) {
    console.log(error);
  }
};

const auth = async (req, res) => {
  const { username , password} = req.body;

  const user = await User.findOne({ username });

  if ( !user ) {
    const error = new Error("User doesn't exists");
    return res.status(404).json({msg: error.message});
  }
    //falta confirmación
};

export { register, auth };