import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import PlayerDashboardTitle from "../title/player-dasboard-title";
import PlayerTable from "../tables/player-table";
import { charCreate, getCharsAll, charRemove } from "../../api/chars-api";


export const PlayerDashboard = () => {

    const [chars, setChars] = useState([]);
    const [name, setName] = useState('');
    const [playerclass, setPlayerClass] = useState('');

    useEffect(() => {
        fetchChars();
    }, []
    );

    const fetchChars = async () => {
        console.log("fetching chars")
        const response = await getCharsAll();
        setChars(response.data);
        
    };

    const handleInputsReset = () => {
        setName('');
        setPlayerClass('');
    };

    const handleCharCreate = async () => {
        await charCreate(name, playerclass);
        await fetchChars();
        
    };

    const handleCharSubmit = async (event) => {
        event.preventDefault();
        // Check if all fields are filled
        if (name.length > 0 && playerclass.length > 0) {
            await handleCharCreate()
    
          // Reset all input fields
          handleInputsReset()
        }
    };

    const handleCharRemove = async (id, name) => {

        // Send DELETE request to '/api/chars' endpoint
        await charRemove(id, name);
        await fetchChars();
    };

    const handleCharRemoveSubmit = async (event) => {
        event.preventDefault();
        console.log(chars);
        if (name.length > 0 && playerclass.length > 0) {
            const charsToRemove = chars.filter(el => (el.name === name && el.playerclass === playerclass));
            for (let i=0; i < charsToRemove.length; i++) {
                await handleCharRemove(charsToRemove[i]._id, charsToRemove[i].name);
            }
            handleInputsReset();
        }
    };

    return (
        <Card border="success" className="table-wrapper table-responsive shadow-sm">
            <Card.Title className="fw-bold text-start ps-3 py-2">
                <PlayerDashboardTitle 
                    setName={setName}
                    setPlayerClass={setPlayerClass}
                    handleCharSubmit={handleCharSubmit}
                    handleCharRemoveSubmit={handleCharRemoveSubmit}/>
            </Card.Title>
            <Card.Body>
                <PlayerTable chars={chars}/>
            </Card.Body>
        </Card>
    );
};


