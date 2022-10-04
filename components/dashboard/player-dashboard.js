import React, {useState, useEffect, useCallback} from "react";
import Card from "react-bootstrap/Card";
import PlayerDashboardTitle from "../title/player-dasboard-title";
import PlayerTable from "../tables/player-table";
import { PlayerStatTable } from "../tables/player-stat-table";
import { charCreate, getCharsAll, charRemove } from "../../api/chars-api";
import { getRounds } from "../../api/rounds-api";
import { Stack } from "react-bootstrap";


export const PlayerDashboard = ({loadedChars, loadedRounds}) => {

    const [chars, setChars] = useState([]);
    const [name, setName] = useState('');
    const [rounds, setRounds] = useState([]);
    const [playerclass, setPlayerClass] = useState('');

    useEffect(() => {
        setChars(loadedChars)
        setRounds(loadedRounds);
    }, []
    );

    const fetchRounds = async () => {
        const roundsInfo = await getRounds();
        setRounds(roundsInfo.data);
    }

    useEffect(() => {
        
        const fetchRoundsSingle = async () => {
            const roundsInfo = await getRounds();
            setRounds(roundsInfo.data);
        }

        fetchRoundsSingle();

    }, [chars]
    )

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
            <Stack gap={3} direction="horizontal" className="d-flex justify-content-center">
                <Card border="" style={{backgroundColor : "#062206"}} className="table-wrapper table-responsive shadow-sm">
                <Card.Title className="fw-bold text-start ps-3 py-2">
                    <PlayerDashboardTitle 
                        setName={setName}
                        setPlayerClass={setPlayerClass}
                        handleCharSubmit={handleCharSubmit}
                        handleCharRemoveSubmit={handleCharRemoveSubmit}/>
                </Card.Title>
                <Card.Body>
                    {chars !== undefined ? <PlayerTable chars={chars} rounds={rounds} fetchRounds={fetchRounds}/> :
                    <div className="fw-bold"> Warning: There was an issue loading character data.</div>
                    } 
                </Card.Body>
                </Card>
                <Card border="" style={{backgroundColor : "#062206"}} className="table-wrapper table-responsive shadow-sm">
                    <Card.Title className="text-center fw-bold px-3 py-2">
                        <div className="text-white">Player Statistics</div>
                    </Card.Title>
                    <Card.Body>
                        <PlayerStatTable chars={chars} rounds={rounds}></PlayerStatTable>
                    </Card.Body>
                </Card>
            </Stack>
        
        
    );
};


