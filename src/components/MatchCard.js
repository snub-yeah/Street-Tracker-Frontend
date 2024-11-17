import React, { useState } from 'react';
import './Styles/MatchCard.css';
// import all character images
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
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete';
import { useAuth0 } from '@auth0/auth0-react';

const MatchCard = ({ match }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
        {id: 16, name: "M. Bison", image: MBison},
    ];

    const getResultText = (result) => {
        switch(result) {
            case 1: return '2-0';
            case 2: return '2-1';
            case 3: return '1-2';
            case 4: return '0-2';
            default: return 'Unknown';
        }
    };

    const getResultClass = (result) => {
        // results 1 and 2 are wins (2-0 and 2-1)
        // results 3 and 4 are losses (1-2 and 0-2)
        return result <= 2 ? 'result-win' : 'result-loss';
    };

    const handleEditMatch = async () => {
        console.log(match);
    };

    const handleDeleteMatch = (matchId) => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        // try {
        //     const token = await getAccessTokenSilently();
        //     await axios.delete(`${process.env.REACT_APP_API_URL}/matches/${match.id}`, {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     });
        //     // You might want to add some callback here to refresh the matches list
        // } catch (error) {
        //     console.error('Error deleting match:', error);
        // }
        setIsDeleteModalOpen(false);
    };

    // find the images of characters based on their name
    const userCharImage = characters.find(char => char.name === match.userCharacter).image;
    const oppCharImage = characters.find(char => char.name === match.opponentCharacter).image;

    return (
        <div className="match-card">
            <ConfirmDelete 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <div className="character-images">
                <img className="character-image" src={userCharImage} alt={match.userCharacter || 'User Character'} />
                <img className="character-image" src={oppCharImage} alt={match.opponentCharacter || 'Opponent Character'} />
            </div>
            <p>Date: {new Date(match.matchTimestamp).toLocaleDateString()}</p>
            <p>Your Character: {match.userCharacter || 'Unknown'}</p>
            <p>Opponent Character: {match.opponentCharacter || 'Unknown'}</p>
            <p className={`${getResultClass(match.result)}`}>
                Result: {getResultText(match.result)}
            </p>
            <button onClick={() => handleEditMatch(match.id)}>Edit</button>
            <button onClick={() => handleDeleteMatch(match.id)}>Delete</button>
        </div>
    );
};

export default MatchCard;
