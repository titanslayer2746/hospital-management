// Import required dependencies
import express from 'express';
import { addAppointment,
         deleteAppointment,
         getAppointments, 
         updateAppointment } from '../controllers/appointment.controller.js';

const router = express.Router();

// Route: GET /api/appointments
// Description: Retrieves all appointments from the database
router.route('/').get(getAppointments);

// Route: POST /api/appointments/add
// Description: Creates a new appointment record
router.route('/add').post(addAppointment);

// Route: POST /api/appointments/update/:id
// Description: Updates an existing appointment's information by its ID
router.route('/update/:id').post(updateAppointment);

// Route: DELETE /api/appointments/delete/:id
// Description: Removes an appointment record from the database by its ID
router.route('/delete/:id').delete(deleteAppointment);

export default router;