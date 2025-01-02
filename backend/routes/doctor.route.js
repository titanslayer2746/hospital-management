import express from 'express';
import { addDoctor, deleteDoctorInfo, getDoctors, updateDoctorInfo } from '../controllers/doctor.controller.js';
const router = express.Router();

// Get all doctors
router.route('/').get(getDoctors);

// Add new doctor
router.route('/add').post(addDoctor);


// Update doctor data
router.route('/update/:id').post(updateDoctorInfo);

// Delete doctor by ID
router.route('/delete/:id').delete(deleteDoctorInfo);

export default router;