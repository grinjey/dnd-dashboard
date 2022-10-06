import {useState, useEffect, useCallback} from "react";
import PlayerList from "../tables/player-list";
import FightOptions from "../dashboard/fight-options";
import axios from "axios";

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


    const handleInitiative = async ({char, initiative}) => {
        if (initiative !== null && initiative !== undefined && initiative !== 0 && initiative !== '') {
    
          const update = {
            fight_id: fight._id,
            char_id: char._id,
            initiative: eval(initiative)
        };
    
        try {
            console.log(`Updating initiative for char: ${update.char_id} for fight ${update.fight_id} to: ${update.initiative}`);
            const response = await axios
                .post('/api/initiative', update);
    
            console.log(response.data);
        } 
        catch (error) {
            console.error(`There was an error updating initiative for char: ${update.char_id} 
                        for fight ${update.fight_id} round ${update.round_id}: ${error}`)
        }
    
        await fetchInitiatives();
    
        }
        
      }

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
            />
        <PlayerList chars={chars} round={round} rounds={roundsToUse} fetchRounds={fetchRounds} fight={fight} fetchInitiatives={fetchInitiatives} handleInitiative={handleInitiative}/>
        </>
    );

}

export default PlayerTable;
