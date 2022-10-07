import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import PlayerInitiativeRow from "./rows/initiative-row";
import PlayerDamageRows from "./rows/damage-rows";
import PlayerStatusRow from "./rows/status-row";
import PlayerTimeRow from "./rows/time-row";

const PlayerListNew = ({chars, round, rounds, fight, fetchRounds, fetchInitiatives}) => {

    const [charsToUse, setCharsToUse] = useState([]);

    useEffect(() => {

        const mergeCharRounds = () => {

            const map = new Map();
            const props = ["damage_output", "damage_taken", "round_time", "round_id", "fight_id", "initiative"]
            chars.forEach(char => map.set(char._id, char));
            rounds.forEach(round => map.set(
                round.char_id, 
                {...map.get(round.char_id), 
                    ...Object.assign({}, ...props.map(prop => ({[prop]: round[prop]})))
                }
            ));


            const merged = Array.from(map.values());

            const sortedMerged = merged.sort((a, b) => b.initiative - a.initiative);

            return sortedMerged;
        }

            const mergedChars = mergeCharRounds();
            setCharsToUse(mergedChars);
            console.log("Updating charsToUse merge");
            console.log(mergedChars);
        

    }, [chars, rounds]
    );

    const handleDamage = async ({fight_id, round_id, char_id, damage_output, damage_taken}) => {

        let out = damage_output ? damage_output : 0;
        let taken = damage_taken ? damage_taken : 0;

        const update = {
            fight_id: fight_id,
            round_id: round_id,
            char_id: char_id,
            damage_output: eval(out),
            damage_taken: eval(taken)
        }

        console.log(update);

        try {
            console.log(`Updating damage for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output} ${update.damage_taken}`);
            const response = await axios
                .post('/api/rounds', update);
    
            console.log(response.data);
        } 
        catch (error) {
            console.error(`There was an error updating damage for char: ${update.char_id} 
                        for fight ${update.fight_id} round ${update.round_id}: ${error}`)
        }

        await fetchRounds();

    }

    const sortCharsByName = () => {
        const currentChars = charsToUse.slice();
        currentChars.sort((a, b) => b.name.localeCompare(a.name));
        setCharsToUse(currentChars);
    };

    const sortCharsByInitiative = () => {
        const currentChars = charsToUse.slice();
        currentChars.sort((a, b) => b.initiative - a.initiative);
        setCharsToUse(currentChars);
    }


    return (

        <Table hover className="">
            <thead>
                <tr className="text-center border-bottom border-dark text-secondary" >
                    <th style={ { minWidth: "150px" } } role='button' onClick={sortCharsByName}>Name <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16"><path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg> </th>
                    <th style={ { minWidth: "150px" } } role='button' onClick={sortCharsByInitiative}>Initiative <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16"><path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg></th>
                    <th style={ { minWidth: "150px" } }>Damage Output</th>
                    <th style={ { minWidth: "150px" } }>Damage Taken</th>
                    <th style={ { minWidth: "150px" } }>Status</th>
                    <th style={ { minWidth: "150px" } }>Round Time</th>
                </tr>
            </thead>
            <tbody>
                {charsToUse.length > 0 ? (
                    charsToUse.map((char, i) => (
                        <tr key={i} className='bg-secondary align-middle fw-bold text-black text-center border-dark'>
                            <td className="border border-right border-dark"><span>{char.name}</span></td>
                            <PlayerInitiativeRow char={char} round={round} fight_id={fight._id} fetchInitiatives={fetchInitiatives}></PlayerInitiativeRow>
                            <PlayerDamageRows char={char} fight_id={fight._id} round={round} fetchRounds={fetchRounds}></PlayerDamageRows>
                            <PlayerStatusRow char={char}></PlayerStatusRow>
                            <PlayerTimeRow char={char} round={round} fight_id={fight._id} fetchRounds={fetchRounds}></PlayerTimeRow>
                        </tr>
                            
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

export default PlayerListNew;

