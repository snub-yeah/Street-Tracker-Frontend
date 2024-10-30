import React from 'react';

const MatchCard = ({ match }) => {
    const getResultText = (result) => {
        switch(result) {
            case 1: return '2-0';
            case 2: return '2-1';
            case 3: return '1-2';
            case 4: return '0-2';
            default: return 'Unknown';
        }
    };

    return (
        <div className="match-card">
            <p>Date: {new Date(match.matchTimestamp).toLocaleDateString()}</p>
            <p>Your Character: {match.userCharacter}</p>
            <p>Opponent Character: {match.opponentCharacter}</p>
            <p>Result: {getResultText(match.result)}</p>
        </div>
    );
};

export default MatchCard;
