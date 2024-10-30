import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeText = () => {
    const navigate = useNavigate();

    const handleBeginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Street Tracker</h1>
            <button onClick={handleBeginClick}>Begin</button>
        </div>
    );
};

export default HomeText;
