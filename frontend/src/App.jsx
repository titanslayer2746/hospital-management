//App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Routes, Route,
    Link, useNavigate
} from 'react-router-dom';
import Appointments from './pages/Appointments.jsx';
import Doctors from './pages/Doctors.jsx';
import Patients from './pages/Patients.jsx';
import './App.css'

const App = () => {
    const isLinkActive = (path) => window.location.pathname === path;
    
    return (
        <Router>
            <div className="container">
                <header>
                    <h1>
                        <span role="img" aria-label="hospital">🏥</span> MediTrack
                    </h1>
                    <p className="subtitle">Your Healthcare Management Solution</p>
                </header>

                <nav>
                    <ul>
                        <li className={isLinkActive('/appointments') ? 'active' : ''}>
                            <Link to="/appointments">
                                <span role="img" aria-label="calendar">📅</span> Appointments
                            </Link>
                        </li>
                        <li className={isLinkActive('/doctors') ? 'active' : ''}>
                            <Link to="/doctors">
                                <span role="img" aria-label="doctor">👨‍⚕️</span> Doctors
                            </Link>
                        </li>
                        <li className={isLinkActive('/patients') ? 'active' : ''}>
                            <Link to="/patients">
                                <span role="img" aria-label="patients">👥</span> Patients
                            </Link>
                        </li>
                    </ul>
                </nav>

                <main>
                    <Routes>
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/" element={<Appointments />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/patients" element={<Patients />} />
                    </Routes>
                </main>

                <footer>
                    <p>© 2024 MediTrack. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
