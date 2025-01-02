import { Appointment } from "../models/appointment.model.js";

const getAppointments = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ', err));
}

const addAppointment = (req, res) => {
    const { patientName, doctorName, date } = req.body;
    const newAppointment = new Appointment({ patientName, doctorName, date });

    newAppointment.save()
        .then(savedAppointment => res.json(savedAppointment))
        .catch(err => res.status(400).json('Error: ' + err));
}

const updateAppointment = (req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => {
            appointment.patientName = req.body.patientName;
            appointment.doctorName = req.body.doctorName;
            appointment.date = req.body.date;

            appointment.save()
                .then(
                    () =>
                        res.json('Appointment updated!'))
                .catch(
                    err => res.status(400)
                        .json('Error: ' + err));
        })
        .catch(
            err => res.status(400)
                .json('Error: ' + err));
}

const deleteAppointment = (req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(
            () => res
                .json('Appointment deleted.'))
        .catch(
            err => res
                .status(400).json('Error: ' + err));
}

export {getAppointments, addAppointment, updateAppointment, deleteAppointment}