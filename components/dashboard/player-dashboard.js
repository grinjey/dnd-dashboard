import React, {useState, useEffect, useCallback} from "react";
import PlayerDashboardTitle from "../title/player-dasboard-title";
import PlayerTable from "../tables/player-table";
import { PlayerStatTable } from "../tables/player-stat-table";
import { getCharsAll } from "../../requests/chars-api";
import { getRounds } from "../../requests/rounds-api";
import { getFightsAll } from "../../requests/fights-api";
import { getInitsAll } from "../../requests/initiative-api";
import { Container } from "react-bootstrap";



export const PlayerDashboard = ({loadedChars, loadedRounds, loadedFights, loadedInitiatives}) => {

    const [chars, setChars] = useState(loadedChars);
    const [rounds, setRounds] = useState(loadedRounds);
    const [fights, setFights] = useState(loadedFights);
    const [initiatives, setInitiatives] = useState(loadedInitiatives)

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

        <Container className="mw-50" style={{backgroundColor : "#062206"}} fluid>
            <PlayerDashboardTitle chars={chars} fetchChars={fetchChars} fetchInitiatives={fetchInitiatives}/>
            <PlayerTable chars={chars} rounds={rounds} fights={fights} initiatives={initiatives} fetchRounds={fetchRounds} fetchFights={fetchFights} fetchInitiatives={fetchInitiatives}/>
            <PlayerStatTable chars={chars} rounds={rounds} fights={fights}></PlayerStatTable>
        </Container>
        
    );
};


