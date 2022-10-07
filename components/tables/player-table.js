import {useState, useEffect} from "react";
import PlayerListNew from "./player-list-new";
import FightOptions from "../dashboard/fight-options";

const PlayerTable = ({chars, rounds, fights, initiatives, fetchFights, fetchRounds, fetchInitiatives}) => {

    const [fight, setFight] = useState({});
    const [round, setRound] = useState(0);
    const [roundsToUse, setRoundsToUse] = useState([])

    useEffect(() => {

        const buildRoundsToUse = () => {
            if (round !== 0 && fight._id !== undefined) {
                console.log("updating rounds to use")
                let currentRounds = rounds.filter(function(roundInfo) {return roundInfo.round_id === round && roundInfo.fight_id === fight._id})
                let currentInitiatives = initiatives.filter(function(initiative) {return initiative.fight_id === fight._id})

                let hash = new Map();
                currentInitiatives.concat(currentRounds).forEach(obj => {
                    hash.set(obj.char_id, Object.assign( hash.get(obj.char_id) || {}, obj ))
                });

                let currentRoundsWithInitiatives = Array.from(hash.values());
                setRoundsToUse(currentRoundsWithInitiatives);

            } else {
                setRoundsToUse([])
            }
        };

        buildRoundsToUse();

    }, [rounds, initiatives, round, fight]
    );

    return (
        <>
        <FightOptions
            chars={chars} 
            fight={fight}
            fights={fights}
            round={round}
            setRound={setRound}
            setFight={setFight}
            fetchFights={fetchFights}
            fetchRounds={fetchRounds}
            fetchInitiatives={fetchInitiatives}
            />
        <PlayerListNew chars={chars} round={round} rounds={roundsToUse} fight={fight} fetchRounds={fetchRounds} fetchInitiatives={fetchInitiatives}/>
        </>
    );

}

export default PlayerTable;
