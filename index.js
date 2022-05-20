import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const {Client, LocalAuth} = pkg
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

const app = express();
dotenv.config();

connectDB();

//CORS Config
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //Can request API
      callback(null, true);
    } else {
      //Cant request API
      callback(null, true);
      //callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;
app.use(express.json());

app.get("/", (req, res) =>
  res.send("Api working as expected! API Created by Zarknex 💀")
);
app.use("/api/users", userRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/medicines", medicineRoutes);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

app.post("/api", async (req, res) => {
  const { message, number } = req.body;
  const numberModified = number.substring(1) + "@c.us";
  client.sendMessage(numberModified, message);
  res.send(`Mensaje enviado correctamente ${message}`);
});


const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is logged in!");
});

client.on("message", (message) => {
  console.log(`Se recibio el siguiente mensaje -> ${message.body}`);
});

client.initialize();