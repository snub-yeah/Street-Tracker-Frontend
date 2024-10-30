import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MatchCard from './MatchCard';

const ViewMatch = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [matches, setMatches] = useState([]);
    const [totalMatches, setTotalMatches] = useState(0);

    useEffect(() => {
        const fetchMatches = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setMatches(response.data.matches);
                    setTotalMatches(response.data.totalMatches);
                } catch (error) {
                    console.error('Error fetching matches:', error);
                }
            }
        };

        fetchMatches();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    return (
        <div className="view-match-container">
            <h1>Your Matches</h1>
            <h2>Total Matches: {totalMatches}</h2>
            {matches.map(match => (
                <MatchCard key={match.match_id} match={match} />
            ))}
        </div>
    );
}

export default ViewMatch;
