//App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Routes, Route,
    Link, useNavigate, Navigate
} from 'react-router-dom';
import Appointments from './pages/Appointments.jsx';
import Doctors from './pages/Doctors.jsx';
import Patients from './pages/Patients.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }
    
    return children;
};

const AppContent = () => {
    const { user, logout, isManager } = useAuth();
    const navigate = useNavigate();

    const isLinkActive = (path) => window.location.pathname === path;

    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <div className="container">
            <header>
                <h1>
                    <span role="img" aria-label="hospital">🏥</span> MediTrack
                </h1>
                <p className="subtitle">Welcome, {user.username} ({user.role})</p>
            </header>

            <nav>
                <ul>
                    <li className={isLinkActive('/appointments') ? 'active' : ''}>
                        <Link to="/appointments">
                            <span role="img" aria-label="calendar">📅</span> Appointments
                        </Link>
                    </li>
                    {isManager && (
                        <li className={isLinkActive('/doctors') ? 'active' : ''}>
                            <Link to="/doctors">
                                <span role="img" aria-label="doctor">👨‍⚕️</span> Doctors
                            </Link>
                        </li>
                    )}
                    <li className={isLinkActive('/patients') ? 'active' : ''}>
                        <Link to="/patients">
                            <span role="img" aria-label="patients">👥</span> Patients
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout} className="logout-button">
                            <span role="img" aria-label="logout">🚪</span> Logout
                        </button>
                    </li>
                </ul>
            </nav>

            <main>
                <Routes>
                    <Route path="/appointments" element={
                        <ProtectedRoute allowedRoles={['manager', 'staff']}>
                            <Appointments />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={
                        <ProtectedRoute allowedRoles={['manager', 'staff']}>
                            <Appointments />
                        </ProtectedRoute>
                    } />
                    <Route path="/doctors" element={
                        <ProtectedRoute allowedRoles={['manager']}>
                            <Doctors />
                        </ProtectedRoute>
                    } />
                    <Route path="/patients" element={
                        <ProtectedRoute allowedRoles={['manager', 'staff']}>
                            <Patients />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>

            <footer>
                <p>© 2024 MediTrack. All rights reserved.</p>
            </footer>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;
