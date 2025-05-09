// Import required dependencies
import express from 'express';
import { addPatient, deletePatientInfo, getPatients, updatePatientInfo } from '../controllers/patient.controller.js';
const router = express.Router();

// Route: GET /api/patients
// Description: Retrieves all patients from the database
router.route('/').get(getPatients);

// Route: POST /api/patients/add
// Description: Creates a new patient record
router.route('/add').post(addPatient);

// Route: POST /api/patients/update/:id
// Description: Updates an existing patient's information by their ID
router.route('/update/:id').post(updatePatientInfo);

// Route: DELETE /api/patients/delete/:id
// Description: Removes a patient record from the database by their ID
router.route('/delete/:id').delete(deletePatientInfo);

export default router;