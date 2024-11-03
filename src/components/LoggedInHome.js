import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LoggedInHome = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        //if not authenticated, take them back!!!
        navigate('/login');
        return null;
    }

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <div>
                <button onClick={() => navigate('/add-match')}>Add Match</button>
                <button onClick={() => navigate('/view-match')}>View Matches</button>
                <button onClick={() => navigate('/stats')}>View Stats</button>
            </div>
        </div>
    );
};

export default LoggedInHome;
