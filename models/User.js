import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    tutorName: {
      type: String,
      trim: true,
    },
    tutorLastName: {
      type: String,
      trim: true,
    },
    token: {
      type: String,
    },
    typeUser:{
      type: String,
      trim: true,
    },
    confirmated: {
      type: String,
      default: false,
    },
    prescriptions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prescription' 
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  //El if se utiliza para evitar que el hash cambié si un usuario intenta registrarse con el mismo username
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.confirmPass = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
