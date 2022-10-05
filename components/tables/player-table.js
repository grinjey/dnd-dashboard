import {useState, useEffect, useCallback} from "react";
import PlayerList from "../tables/player-list";
import FightOptions from "../dashboard/fight-options";

const PlayerTable = ({chars, rounds, fetchRounds, fights, fetchFights}) => {

    const [fight, setFight] = useState({});
    const [round, setRound] = useState(0);
    const [roundsToUse, setRoundsToUse] = useState([])

    useEffect(() => {

        const buildRoundsToUse = () => {
            if (round !== 0 && fight._id !== undefined) {
                console.log("updating rounds to use")
                let currentRounds = rounds.filter(function(roundInfo) {return roundInfo.round_id === round && roundInfo.fight_id === fight._id})
                setRoundsToUse(currentRounds);
            } else {
                setRoundsToUse([])
            }
        };

        buildRoundsToUse();

    }, [rounds, round, fight]
    );


    return (
        <>
        <FightOptions 
            fight={fight}
            fights={fights}
            round={round}
            setRound={setRound}
            setFight={setFight}
            fetchFights={fetchFights}
            fetchRounds={fetchRounds}
            />
        <PlayerList chars={chars} round={round} rounds={roundsToUse} fetchRounds={fetchRounds} fight={fight}/>
        </>
    );

}

export default PlayerTable;
