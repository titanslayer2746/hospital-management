// Import required dependencies
import express from 'express';
import { addDoctor, deleteDoctorInfo, getDoctors, updateDoctorInfo } from '../controllers/doctor.controller.js';
const router = express.Router();

// Route: GET /api/doctors
// Description: Retrieves all doctors from the database
router.route('/').get(getDoctors);

// Route: POST /api/doctors/add
// Description: Creates a new doctor record
router.route('/add').post(addDoctor);

// Route: POST /api/doctors/update/:id
// Description: Updates an existing doctor's information by their ID
router.route('/update/:id').post(updateDoctorInfo);

// Route: DELETE /api/doctors/delete/:id
// Description: Removes a doctor record from the database by their ID
router.route('/delete/:id').delete(deleteDoctorInfo);

export default router;