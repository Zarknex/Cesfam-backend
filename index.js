import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';

const app = express();
dotenv.config();

connectDB();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});