import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import patientsRouter from "./routes/patient.route.js"
import doctorsRouter from "./routes/doctor.route.js"
import appoinmentsRouter from "./routes/appointment.route.js"
import connectDB from './db/index.js';

dotenv.config({
    path:'./.env',
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB()

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appoinmentsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});