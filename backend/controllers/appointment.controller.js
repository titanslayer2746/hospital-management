import { Appointment } from "../models/appointment.model.js";

/**
 * Retrieves all appointments from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all appointments
 */
const getAppointments = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ', err));
}

/**
 * Creates a new appointment record
 * @param {Object} req - Express request object containing appointment data (patientName, doctorName, date)
 * @param {Object} res - Express response object
 * @returns {Object} The newly created appointment record
 */
const addAppointment = (req, res) => {
    const { patientName, doctorName, date } = req.body;
    const newAppointment = new Appointment({ patientName, doctorName, date });

    newAppointment.save()
        .then(savedAppointment => res.json(savedAppointment))
        .catch(err => res.status(400).json('Error: ' + err));
}

/**
 * Updates an existing appointment's information
 * @param {Object} req - Express request object containing appointment ID and updated data
 * @param {Object} res - Express response object
 * @returns {String} Success message or error
 */
const updateAppointment = (req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => {
            // Update appointment information
            appointment.patientName = req.body.patientName;
            appointment.doctorName = req.body.doctorName;
            appointment.date = req.body.date;

            appointment.save()
                .then(() => res.json('Appointment updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

/**
 * Deletes an appointment record from the database
 * @param {Object} req - Express request object containing appointment ID
 * @param {Object} res - Express response object
 * @returns {String} Success message or error
 */
const deleteAppointment = (req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Appointment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

export {getAppointments, addAppointment, updateAppointment, deleteAppointment}