import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
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
import './Styles/ViewStats.css';

const ViewStats = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [player1Selection, setPlayer1Selection] = useState(null);
    const [player1Hover, setPlayer1Hover] = useState(null);
    const [stats, setStats] = useState({
        overall: { wins: 0, losses: 0 },
        matchups: {}
    });
    //declare an array of character objects containing id, name, and image
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
    ]

    
    const calculateSlot = (x, y, isDragData = false) => {
        const grid = document.querySelector('.character-select-grid');
        if (!grid) return null;

        const gridRect = grid.getBoundingClientRect();
        
        // get cursor position based on what they see
        let clientX, clientY;
        if (isDragData) {
            
            const cursor = document.querySelector('.player1-cursor, .player2-cursor');
            const cursorRect = cursor?.getBoundingClientRect(); //i just found out the ? prevents errors if the cursor doesn't exist
            if (!cursorRect) return null; //if the cursor doesn't exist, return null
            
            // use the center of cursor cuz otherwise it was all wonky
            clientX = cursorRect.left + (cursorRect.width / 2);
            clientY = cursorRect.top + (cursorRect.height / 2);
        } else {
            clientX = x; //if it's not drag data, use the x and y passed in
            clientY = y;
        }
        
        // calculate position relative to grid
        const gridX = clientX - gridRect.left;
        const gridY = clientY - gridRect.top;
        
        const numCols = 8;
        const numRows = 2;
        
        // calculate cell dimensions
        const cellWidth = gridRect.width / numCols;
        const cellHeight = gridRect.height / numRows;
        
        // calculate column and row with bounds checking
        const col = Math.min(Math.max(Math.floor(gridX / cellWidth), 0), numCols - 1);
        const row = Math.min(Math.max(Math.floor(gridY / cellHeight), 0), numRows - 1);
        
        // return null if outside the grid bounds
        if (gridX < 0 || gridX > gridRect.width || gridY < 0 || gridY > gridRect.height) {
            return null;
        }
        
        const index = row * numCols + col;
        //if the index isn't valid, return null
        if (index < 0 || index >= characters.length) {
            return null;
        }
        //otherwise return the character
        return characters[index];
    };

    //getStats is called whenever the player1Selection changes
    useEffect(() => {
        getStats();
    }, [player1Selection]);

    const handleDrag = (playerId, e) => {
        const selectedCharacter = calculateSlot(e.clientX, e.clientY);
        
        if (selectedCharacter) {
            if (playerId === 1) {
                setPlayer1Hover(selectedCharacter);
            }
        }
    };

    //pass in the playerId so we can see who is being selected
    const handleDragStop = (playerId, e) => {
        const selectedCharacter = calculateSlot(e.clientX, e.clientY);
        
        if (selectedCharacter) {
            if (playerId === 1) {
                setPlayer1Selection(selectedCharacter);
                setPlayer1Hover(null);
            }
        }
    };

    const getStats = async () => {
        if (isAuthenticated && player1Selection) {
            const token = await getAccessTokenSilently();
            
            // this will give total wins and losses
            const overallResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/character-stats`, {
                    params: { characterName: player1Selection.name },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // loop thru each character and get the matchup stats
            const matchupStats = {};
            for (const opponent of characters) {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/character-stats`, {
                        params: { 
                            characterName: player1Selection.name,
                            opponentCharacter: opponent.name 
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                //create an array of objects for each character with the wins and losses
                matchupStats[opponent.name] = {
                    wins: response.data.wins || 0,
                    losses: response.data.losses || 0
                };
            }

            //set the stats for the character to the matchups we created
            setStats({
                overall: {
                    wins: overallResponse.data.wins || 0,
                    losses: overallResponse.data.losses || 0
                },
                matchups: matchupStats
            });
        }
    };

    //if the user is not authenticated, navigate to the login page
    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    
    return (

        <div className="add-match-container">
            <button onClick={() => navigate('/home')}>Back</button>
            <h1 className="page-title">View Stats</h1>
            
            <div className="selected-characters">
                <div className="player-selection">
                    <h3>Player 1</h3>
                    {(player1Selection || player1Hover) ? (
                        <>
                            <img 
                                src={(player1Hover || player1Selection).image} 
                                alt={(player1Hover || player1Selection).name} 
                            />
                            <h3>{(player1Hover || player1Selection).name}</h3>
                        </>
                    ) : (
                        <>
                            <img src={Ryu} alt="Ryu" />
                            <h3 className="no-character">No selection</h3>
                        </>
                    )}
                    <button onClick={() => setPlayer1Selection(null)}>No Character</button>
                </div>

                <div className="character-stats">
                    {player1Selection && (
                        <>
                            <h2>{player1Selection.name} Stats</h2>
                            <div className="overall-stats">
                                <p>Overall: {stats.overall.wins}W - {stats.overall.losses}L</p>
                                <p>Win Rate: {stats.overall.wins + stats.overall.losses > 0 ? 
                                    ((stats.overall.wins / (stats.overall.wins + stats.overall.losses)) * 100).toFixed(1) : 0}%</p>
                            </div>
                            <h3>Character Matchups:</h3>
                            <div className="matchups-grid">
                                {characters.map(char => (
                                    <div key={char.id} className="matchup-item">
                                        <p>Vs. {char.name}:</p>
                                        <p>{stats.matchups[char.name]?.wins || 0}W - {stats.matchups[char.name]?.losses || 0}L</p>
                                        {/* win rate. this could be calculated in separate variables but it's whatever */}
                                        <p>{(stats.matchups[char.name]?.wins || 0) + (stats.matchups[char.name]?.losses || 0) > 0 ?
                                            ((stats.matchups[char.name]?.wins / ((stats.matchups[char.name]?.wins || 0) + (stats.matchups[char.name]?.losses || 0))) * 100).toFixed(1) : 0}%</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="character-select-grid">
                {characters.map((char) => ( //map of characters and create a div for each one
                    <div key={char.id} className="character-slot">
                        <img src={char.image} alt={char.name} />
                    </div>
                ))}
                
                <Draggable 
                    onDrag={(e, data) => handleDrag(1, e, data)}
                    onStop={(e, data) => handleDragStop(1, e, data)}
                >
                    <div className="player-cursor player1-cursor" />
                </Draggable>
            </div>
        </div>
      );
}

export default ViewStats;