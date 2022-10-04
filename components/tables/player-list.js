import { useCallback, useEffect, useState } from "react";
import { PlayersListRow } from "./player-row";
import Table from "react-bootstrap/Table";
import { updateDamage, addRound } from "../../api/rounds-api";
import { updateTime } from "../../api/time-api";


const PlayerList = ({chars, round, rounds, fetchRounds, fight}) => {

    const [playerInitiatives, setPlayerInitiatives] = useState({});
    const [charsToUse, setCharsToUse] = useState([]);
    const [damageOutput, setDamageOutput] = useState(0);
    const [damageTaken, setDamageTaken] = useState(0);

    const mergeCharRounds = useCallback(() => {

        const map = new Map();
        const props = ["damage_output", "damage_taken", "round_time"]
        chars.forEach(char => map.set(char._id, char));
        rounds.forEach(round => map.set(
            round.char_id, 
            {...map.get(round.char_id), 
             ...Object.assign({}, ...props.map(prop => ({[prop]: round[prop]})))
            }
        ));
        const merged = Array.from(map.values());
        const filtered = merged.filter(function(item) {return item._id !== undefined;})
        return filtered;
    }, [chars, rounds])

    useEffect(() => {

        if (rounds.length > 0) {
            const mergedChars = mergeCharRounds();
            setCharsToUse(mergedChars);
            console.log("Updating charsToUse merge");
            console.log(mergedChars);
        } 
        else {
            console.log("Updating charsToUse");
            setCharsToUse(chars); 
        }

    }, [chars, rounds, mergeCharRounds]
    );

    const handleInputsReset = () => {
        setDamageOutput(0);
        setDamageTaken(0);
    }; 

    const handleInitiative = (event, id) => {
        const currentInitiatives = Object.assign({}, playerInitiatives);
        const newInitiatives = Object.assign(currentInitiatives, {[id] : event});
        setPlayerInitiatives(newInitiatives);
    };

    const sortCharsByInitiative = () => {
        const currentChars = charsToUse.slice();
        const updatedChars = currentChars.map((char) => 
            Object.assign(char, { 'initiative': playerInitiatives[char._id]}));
        updatedChars.sort((a, b) => b.initiative - a.initiative);
        setCharsToUse(updatedChars);
    };

    const createRound = async (char) => {

        const roundToAdd = {
            fight_id: fight._id,
            round_id: round,
            char_id: char._id,
            damage_output: eval(damageOutput),
            damage_taken: eval(damageTaken)
        }

        console.log("ADDING ROUND: ")
        console.log(roundToAdd)

        await addRound(roundToAdd);
        
    }

    const handleDamageOutput = async (char) => {
        if (char.damage_output !== undefined && char.damage_taken !== undefined && damageOutput !== undefined && fight._id !== undefined && round !== 0) {
            console.log("updating damage output: ", damageOutput)
            await updateRoundDamageOutput(char);
        } else {
            await createRound(char);
        }
        await fetchRounds();
        handleInputsReset();
        
    }

    const handleDamageTaken = async (char) => {
        if (char.damage_output !== undefined && char.damage_taken !== undefined && damageTaken !== undefined && fight._id !== undefined && round !== 0) {
            await updateRoundDamageTaken(char);
        } else {
            await createRound(char);
        }
        await fetchRounds();
        handleInputsReset();
    }

    const updateRoundDamageOutput = async (char) => {

        const update = {
            fight_id: fight._id,
            round_id: round,
            char_id: char._id,
            damage_output: eval(damageOutput),
        }

        await updateDamage(update);
    };

    const updateRoundDamageTaken = async (char) => {

        const update = {
            fight_id: fight._id,
            round_id: round,
            char_id: char._id,
            damage_taken: eval(damageTaken),
        }

        await updateDamage(update);
    };

    const handleUpdateTime = async ({char, seconds}) => {

        if (char._id !== undefined && fight._id !== undefined && round !== 0) {
            await updateRoundTime({char, seconds});
            await fetchRounds();
        } else {
            console.log("Cannot update round time when not enough info present");
        }
    }

    const updateRoundTime = async ({char, seconds}) => {
        const update = {
            fight_id: fight._id,
            round_id: round,
            char_id: char._id,
            round_time: Number(seconds),
        }

        await updateTime(update);

    }

    return (

        <Table hover className="align-items-center">
            <thead>
                <tr>
                    <th className="border-bottom text-secondary">Name</th>
                    <th className="border-bottom text-secondary">Class</th>
                    <th className="border-bottom text-secondary" role='button' onClick={sortCharsByInitiative}>Initiative <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16"><path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg></th>
                    <th className="border-bottom text-secondary">Damage Output</th>
                    <th className="border-bottom text-secondary">Damage Taken</th>
                    <th className="border-bottom text-secondary">Round Time</th>
                </tr>
            </thead>
            <tbody>
                {charsToUse.length > 0 ? (
                    charsToUse.map((char) => (
                            <PlayersListRow key={char._id}
                                char={char}
                                initiative={playerInitiatives[char._id]}
                                handleInitiative={handleInitiative}
                                setDamageOutput={setDamageOutput}
                                setDamageTaken={setDamageTaken}
                                handleDamageOutput={handleDamageOutput}
                                handleDamageTaken={handleDamageTaken}
                                handleUpdateTime={handleUpdateTime}>

                            </PlayersListRow>
                        )
                        )
                    ) : (
                        <tr className="table-row">
                            <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no Characters to show. Create one!</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

export default PlayerList;
