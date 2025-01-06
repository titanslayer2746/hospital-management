import {Patient} from "../models/patient.model.js"

const getPatients = (req, res) => {
    Patient.find()
        .then(patients =>
            res.json(patients))
        .catch(err =>
            res.status(400)
                .json('Error: ' + err));
}

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

const updatePatientInfo = (req, res) => {

    Patient.findById(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404)
                    .json('Patient not found');
            }

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

export {deletePatientInfo, addPatient, updatePatientInfo,getPatients}