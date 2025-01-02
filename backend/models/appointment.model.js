import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    
    patientName: {
        type: String,
        required: true 
    },

    doctorName: {
        type: String, 
        required: true
    },

    date: { 
        type: Date, 
        required: true 
    },
    
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
