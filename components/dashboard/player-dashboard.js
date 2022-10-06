import React, {useState, useEffect, useCallback} from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import PlayerDashboardTitle from "../title/player-dasboard-title";
import PlayerTable from "../tables/player-table";
import { PlayerStatTable } from "../tables/player-stat-table";
import { getCharsAll } from "../../requests/chars-api";
import { getRounds } from "../../requests/rounds-api";
import { getFightsAll } from "../../requests/fights-api";
import { getInitsAll } from "../../requests/initiative-api";



export const PlayerDashboard = ({loadedChars, loadedRounds, loadedFights, loadedInitiatives}) => {

    const [chars, setChars] = useState(loadedChars);
    const [rounds, setRounds] = useState(loadedRounds);
    const [fights, setFights] = useState(loadedFights);
    const [initiatives, setInitiatives] = useState(loadedInitiatives)

    // useEffect(() => {
    //     fetchChars();
    //     fetchFights();
    //     fetchRounds();
    // },[]
    // )

    // useEffect(() => {
        
    //     const fetchRoundsSingle = async () => {
    //         console.log("Fetching rounds single")
    //         const roundsInfo = await getRounds();
    //         setRounds(roundsInfo.data);
    //     }

    //     fetchRoundsSingle();

    // }, [chars]
    // )

    const fetchChars = async () => {
        console.log("fetching chars")
        const response = await getCharsAll();
        setChars(response.data);
        
    };

    const fetchRounds = async () => {
        console.log(`fetching rounds.`)
        const roundsInfo = await getRounds();
        setRounds(roundsInfo.data);
    }

    const fetchFights = async () => {
        console.log("fetching fights");
        const fightData = await getFightsAll();

        setFights(fightData.data);
    };

    const fetchInitiatives = async () => {
        console.log("fetching initiatives");
        const initData = await getInitsAll();
        setInitiatives(initData.data);
    };

    return (
            <Stack gap={3} direction="horizontal" className="d-flex justify-content-center">
                <Card border="" style={{backgroundColor : "#062206"}} className="table-wrapper table-responsive shadow-sm">
                <Card.Title className="fw-bold text-start ps-3 py-2">
                    <PlayerDashboardTitle chars={chars} fetchChars={fetchChars} fetchInitiatives={fetchInitiatives}/>
                </Card.Title>
                <Card.Body>
                    <PlayerTable chars={chars} rounds={rounds} fights={fights} initiatives={initiatives} fetchRounds={fetchRounds} fetchFights={fetchFights} fetchInitiatives={fetchInitiatives}/>
                </Card.Body>
                </Card>
                <PlayerStatTable chars={chars} rounds={rounds} fights={fights}></PlayerStatTable>
            </Stack>
        
        
    );
};


