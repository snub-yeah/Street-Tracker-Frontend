import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Ryu from './images/ryu.gif';
import Honda from './images/ehonda.gif';
import Blanka from './images/blanka.gif';
import Guile from './images/guile.gif';
import Balrog from './images/balrog.gif';
import Ken from './images/ken.gif';
import ChunLi from './images/chun-li.gif';
import Zangief from './images/zangief.gif';
import Dhalsim from './images/dhalsim.gif';
import Sagat from './images/sagat.gif';
import Vega from './images/vega.gif';
import THawk from './images/thawk.gif';
import FeiLong from './images/feilong.gif';
import Deejay from './images/deejay.gif';
import Cammy from './images/cammy.gif';
import MBison from './images/mbison.gif';

const EditMatch = ({ isOpen, onClose, match }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [userCharacter, setUserCharacter] = useState(match.userCharacter);
    const [opponentCharacter, setOpponentCharacter] = useState(match.opponentCharacter);

    const characters = [
        {id: 1, name: "Ryu", image: Ryu},
        {id: 2, name: "E. Honda", image: Honda},
        {id: 3, name: "Blanka", image: Blanka},
        {id: 4, name: "Guile", image: Guile},
        {id: 5, name: "Balrog", image: Balrog},
        {id: 6, name: "Ken", image: Ken},
        {id: 7, name: "Chun-Li", image: ChunLi},
        {id: 8, name: "Zangief", image: Zangief},
        {id: 9, name: "Dhalsim", image: Dhalsim},
        {id: 10, name: "Sagat", image: Sagat},
        {id: 11, name: "Vega", image: Vega},
        {id: 12, name: "T. Hawk", image: THawk},
        {id: 13, name: "Fei Long", image: FeiLong},
        {id: 14, name: "Deejay", image: Deejay},
        {id: 15, name: "Cammy", image: Cammy},
        {id: 16, name: "M. Bison", image: MBison}
    ];

    if (!isOpen) return null;

    const handleUpdate = async (selectedResult) => {
        try {
            const token = await getAccessTokenSilently();
            const updatedMatch = {
                match_id: match.match_id,
                userCharacter,
                opponentCharacter,
                result: selectedResult,
                matchTimestamp: match.matchTimestamp 
            };
            
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/matches/${match.match_id}`,
                updatedMatch,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (match.onMatchDeleted) {
                match.onMatchDeleted();
            }
            
            onClose(); 
        } catch (error) {
            console.error('Error updating match:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1>Edit Match</h1>
                <div>
                    <label>User Character:</label>
                    <select value={userCharacter} onChange={(e) => setUserCharacter(e.target.value)}>
                        {characters.map(char => (
                            <option key={char.id} value={char.name}>{char.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Opponent Character:</label>
                    <select value={opponentCharacter} onChange={(e) => setOpponentCharacter(e.target.value)}>
                        {characters.map(char => (
                            <option key={char.id} value={char.name}>{char.name}</option>
                        ))}
                    </select>
                </div>
                <div className="result-buttons">
                    <h3>Select Result:</h3>
                    <button onClick={() => handleUpdate(1)}>2-0</button>
                    <button onClick={() => handleUpdate(2)}>2-1</button>
                    <button onClick={() => handleUpdate(3)}>1-2</button>
                    <button onClick={() => handleUpdate(4)}>0-2</button>
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditMatch;