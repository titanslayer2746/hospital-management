import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    specialty: { 
        type: String, 
        required: true 
    },
   
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
