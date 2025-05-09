import {Doctor} from "../models/doctor.model.js"

/**
 * Retrieves all doctors from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all doctors
 */
const getDoctors = (req, res) => {
    Doctor.find()
        .then(doctors =>
            res.json(doctors))
        .catch(err =>
            res.status(400)
                .json('Error: ' + err));
}

/**
 * Creates a new doctor record
 * @param {Object} req - Express request object containing doctor data (name, specialty)
 * @param {Object} res - Express response object
 * @returns {Object} The newly created doctor record
 */
const addDoctor = (req, res) => {
    const { name, specialty } = req.body;

    const newDoctor =
        new Doctor({ name, specialty });

    newDoctor.save()
        .then(savedDoctor =>
            res.json(savedDoctor))
        .catch(
            err =>
                res.status(400)
                    .json('Error: ' + err));
}

/**
 * Updates an existing doctor's information
 * @param {Object} req - Express request object containing doctor ID and updated data
 * @param {Object} res - Express response object
 * @returns {String} Success message or error
 */
const updateDoctorInfo = (req, res) => {
    Doctor.findById(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404)
                    .json('Doctor not found');
            }

            // Update doctor information
            doctor.name = req.body.name;
            doctor.specialty = req.body.specialty;

            doctor.save()
                .then(() => res.json('Doctor updated!'))
                .catch(err => res.status(400)
                    .json('Error: ' + err));
        })
        .catch(err => res.status(400)
            .json('Error: ' + err));
}

/**
 * Deletes a doctor record from the database
 * @param {Object} req - Express request object containing doctor ID
 * @param {Object} res - Express response object
 * @returns {String} Success message or error
 */
const deleteDoctorInfo = (req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404)
                    .json('Doctor not found');
            }
            res.json('Doctor deleted!');
        })
        .catch(err => res.status(400)
            .json('Error: ' + err));
}

export {deleteDoctorInfo, updateDoctorInfo, addDoctor, getDoctors}