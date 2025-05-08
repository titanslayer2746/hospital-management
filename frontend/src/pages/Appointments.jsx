import {
    useState,
    useEffect,
    useRef
} from 'react';
import axios from 'axios';
import AppointmentCard from '../components/AppointmentCard.jsx';
import '../css/Appointments.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        patientName: '',
        doctorName: '',
        date: ''
    });
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [suggestions, setSuggestions] = useState({
        doctors: [],
        patients: []
    });
    const [activeDropdown, setActiveDropdown] = useState(null);
    const patientInputRef = useRef(null);
    const doctorInputRef = useRef(null);

    useEffect(() => {
        // Fetch appointments
        axios.get(`${BASE_URL}/api/appointments`)
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));

        // Fetch doctors
        axios.get(`${BASE_URL}/api/doctors`)
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));

        // Fetch patients
        axios.get(`${BASE_URL}/api/patients`)
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));

        // Add click outside listener
        const handleClickOutside = (event) => {
            if (activeDropdown === 'patient' && 
                patientInputRef.current && 
                !patientInputRef.current.contains(event.target)) {
                setActiveDropdown(null);
                setSuggestions(prev => ({ ...prev, patients: [] }));
            }
            if (activeDropdown === 'doctor' && 
                doctorInputRef.current && 
                !doctorInputRef.current.contains(event.target)) {
                setActiveDropdown(null);
                setSuggestions(prev => ({ ...prev, doctors: [] }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        const isEdit = isEditMode;
        const targetState = isEdit ? selectedAppointment : newAppointment;
        const setTargetState = isEdit ? setSelectedAppointment : setNewAppointment;

        // Update the input value
        setTargetState({
            ...targetState,
            [type]: value
        });

        // Update suggestions based on input
        if (type === 'doctorName') {
            const filteredDoctors = doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(prev => ({
                ...prev,
                doctors: filteredDoctors
            }));
            setActiveDropdown('doctor');
        } else if (type === 'patientName') {
            const filteredPatients = patients.filter(patient =>
                patient.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(prev => ({
                ...prev,
                patients: filteredPatients
            }));
            setActiveDropdown('patient');
        }
    };

    const handleInputClick = (type) => {
        setActiveDropdown(type);
        if (type === 'doctor') {
            setSuggestions(prev => ({
                ...prev,
                doctors: doctors
            }));
        } else if (type === 'patient') {
            setSuggestions(prev => ({
                ...prev,
                patients: patients
            }));
        }
    };

    const handleSuggestionClick = (name, type) => {
        const isEdit = isEditMode;
        const targetState = isEdit ? selectedAppointment : newAppointment;
        const setTargetState = isEdit ? setSelectedAppointment : setNewAppointment;

        setTargetState({
            ...targetState,
            [type]: name
        });

        // Clear suggestions and active dropdown
        setSuggestions(prev => ({
            ...prev,
            [type === 'doctorName' ? 'doctors' : 'patients']: []
        }));
        setActiveDropdown(null);
    };

    const handleAddAppointment = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/api/appointments/add`, newAppointment)
            .then(response => {
                setAppointments([...appointments, response.data]);
                setNewAppointment({
                    patientName: '',
                    doctorName: '',
                    date: ''
                });
            })
            .catch(error => console.error('Error adding appointment:', error));
    };

    const handleUpdateAppointment = (id, e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/api/appointments/update/${id}`, selectedAppointment)
            .then(response => {
                const updateApp = {
                    ...selectedAppointment,
                    _id: id
                };
                setAppointments(appointments.map(appointment =>
                    appointment._id === id ? updateApp : appointment
                ));
                setSelectedAppointment(null);
                setIsEditMode(false);
            })
            .catch(error => console.error('Error updating appointment:', error));
    };

    const handleDeleteAppointment = (id) => {
        axios.delete(`${BASE_URL}/api/appointments/delete/${id}`)
            .then(response => {
                setAppointments(appointments.filter(appointment => appointment._id !== id));
            })
            .catch(error => console.error('Error deleting appointment:', error));
    };

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setIsEditMode(true);
    };

    return (
        <div className='flex-row' style={{ width: "100%" }}>
            <div className='flex-column'>
                <div className='add-form'>
                    <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
                    <form className="appointment-form"
                        onSubmit={isEditMode ?
                            (e) => handleUpdateAppointment(selectedAppointment._id, e) :
                            handleAddAppointment}>
                        <div className="form-group">
                            <label>Patient Name:</label>
                            <div className="autocomplete-container" ref={patientInputRef}>
                                <input
                                    type="text"
                                    value={isEditMode ? selectedAppointment.patientName : newAppointment.patientName}
                                    onChange={(e) => handleInputChange(e, 'patientName')}
                                    onClick={() => handleInputClick('patient')}
                                    required
                                />
                                {activeDropdown === 'patient' && suggestions.patients.length > 0 && (
                                    <ul className="suggestions-list">
                                        {suggestions.patients.map(patient => (
                                            <li
                                                key={patient._id}
                                                onClick={() => handleSuggestionClick(patient.name, 'patientName')}
                                            >
                                                {patient.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Doctor Name:</label>
                            <div className="autocomplete-container" ref={doctorInputRef}>
                                <input
                                    type="text"
                                    value={isEditMode ? selectedAppointment.doctorName : newAppointment.doctorName}
                                    onChange={(e) => handleInputChange(e, 'doctorName')}
                                    onClick={() => handleInputClick('doctor')}
                                    required
                                />
                                {activeDropdown === 'doctor' && suggestions.doctors.length > 0 && (
                                    <ul className="suggestions-list">
                                        {suggestions.doctors.map(doctor => (
                                            <li
                                                key={doctor._id}
                                                onClick={() => handleSuggestionClick(doctor.name, 'doctorName')}
                                            >
                                                {doctor.name} - {doctor.specialty}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Date:</label>
                            <input
                                type="date"
                                value={isEditMode ? selectedAppointment.date : newAppointment.date}
                                onChange={(e) => handleInputChange(e, 'date')}
                                required
                            />
                        </div>

                        <button type="submit">
                            {isEditMode ? 'Update Appointment' : 'Add Appointment'}
                        </button>
                    </form>
                </div>
            </div>

            <div className='appointments'>
                <div className="appointment-list">
                    {appointments.map(appointment => (
                        <AppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                            onEdit={handleEditAppointment}
                            onDelete={handleDeleteAppointment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
