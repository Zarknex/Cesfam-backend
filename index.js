import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';

const app = express();
dotenv.config();

connectDB();

//CORS Config
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.includes(origin)) {
      //Can request API
      callback(null, true);
    } else {
      //Cant request API
      callback(null, true);
      //callback(new Error("Error de CORS"));
    }
  }
};

app.use(cors(corsOptions));


const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});