import express from 'express';
import { addPatient, deletePatientInfo, getPatients, updatePatientInfo } from '../controllers/patient.controller.js';
const router = express.Router();

// Get all patients
router.route('/').get(getPatients);

// Add new patient
router.route('/add').post(addPatient);

// Update patient data
router.route('/update/:id').post(updatePatientInfo);

// Delete patient by ID
router.route('/delete/:id').delete(deletePatientInfo);

export default router;