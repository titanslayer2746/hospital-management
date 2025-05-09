import {Patient} from "../models/patient.model.js"

/**
 * Retrieves all patients from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all patients
 */
const getPatients = (req, res) => {
    Patient.find()
        .then(patients =>
            res.json(patients))
        .catch(err =>
            res.status(400)
                .json('Error: ' + err));
}

/**
 * Creates a new patient record
 * @param {Object} req - Express request object containing patient data (name, age, gender)
 * @param {Object} res - Express response object
 * @returns {Object} The newly created patient record
 */
const addPatient = (req, res) => {
    const { name, age, gender } = req.body;

    const newPatient =
        new Patient({ name, age, gender });

    newPatient.save()
        .then(savedPatient =>
            res.json(savedPatient))
        .catch(err => res.status(400)
            .json('Error: ' + err));
}

/**
 * Updates an existing patient's information
 * @param {Object} req - Express request object containing patient ID and updated data
 * @param {Object} res - Express response object
 * @returns {String} Success message or error
 */
const updatePatientInfo = (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404)
                    .json('Patient not found');
            }

            // Update patient information
            patient.name = req.body.name;
            patient.age = req.body.age;
            patient.gender = req.body.gender;

            patient.save()
                .then(() => res.json('Patient updated!'))
                .catch(err => res.status(400)
                    .json('Error: ' + err));
        })
        .catch(err => res.status(400)
            .json('Error: ' + err));
}

/**
 * Deletes a patient record from the database
 * @param {Object} req - Express request object containing patient ID
 * @param {Object} res - Express response object
 * @returns {String} Success message or error
 */
const deletePatientInfo = (req, res) => {
    Patient.findByIdAndDelete(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404)
                    .json('Patient not found');
            }
            res.json('Patient deleted!');
        })
        .catch(err => res.status(400)
            .json('Error: ' + err));
}

export {deletePatientInfo, addPatient, updatePatientInfo, getPatients}