import express from 'express';
import { addAppointment,
         deleteAppointment,
         getAppointments, 
         updateAppointment } from '../controllers/appointment.controller.js';

const router = express.Router();

// Get all appointments
router.route('/').get(getAppointments);

// Add new appointment
router.route('/add').post(addAppointment);

// Update appointment data
router.route('/update/:id').post(updateAppointment);

// Delete appointment
router.route('/delete/:id').delete(deleteAppointment);

export default router;