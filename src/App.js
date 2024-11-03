import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import './App.css';
import HomePage from './components/HomePage.js';
import LoginPage from './components/LoginPage.js';
import LoggedInHome from './components/LoggedInHome.js';
import AddMatch from './components/AddMatch.js';
import ViewMatch from './components/ViewMatch.js';
import ViewStats from './components/ViewStats.js';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <Auth0Provider
            domain="dev-75ytwc3q1ajy1ls4.us.auth0.com"  
            clientId="CLdibGQNKhywm9e9e5GBPKayKdE1Yf6o"
            authorizationParams={{
                redirect_uri: window.location.origin + '/login',
                audience: 'https://dev-75ytwc3q1ajy1ls4.us.auth0.com/api/v2/'
            }}
            scope="openid profile email"
        >
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route 
                            path="/home" 
                            element={
                                <ProtectedRoute>
                                    <LoggedInHome />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/add-match" element={<AddMatch />} />
                        <Route path="/view-match" element={<ViewMatch />} />
                        <Route path="/stats" element={<ViewStats />} />
                    </Routes>
                </div>
            </Router>
        </Auth0Provider>
    );
}

export default App;
