import { useEffect, useState } from "react";
import { PlayersListRow } from "./player-row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { statusList} from "../../utils/statuses";

const PlayerList = ({chars, round, rounds, fight, fetchRounds, handleInitiative}) => {

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
            
            // merged.forEach(char => {
            //     if (!char.statuses) {
            //         char.statuses = statusList;
            //     }

            // })

            return sortedMerged;
        }

        // if (rounds.length > 0) {
        //     const mergedChars = mergeCharRounds();
        //     setCharsToUse(mergedChars);
        //     console.log("Updating charsToUse merge");
        //     console.log(mergedChars);
        // } 
        // else {
        //     console.log("Updating charsToUse");
        //     setCharsToUse(chars); 
        // }

            const mergedChars = mergeCharRounds();
            setCharsToUse(mergedChars);
            console.log("Updating charsToUse merge");
            console.log(mergedChars);
        

    }, [chars, rounds]
    );

    // const handleInitiative = (event, id) => {
    //     const currentInitiatives = Object.assign({}, playerInitiatives);
    //     const newInitiatives = Object.assign(currentInitiatives, {[id] : event});
    //     setPlayerInitiatives(newInitiatives);
    // };

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

    
    const handleDamage = async ({fight_id, round_id, char_id, damage_ouput, damage_taken}) => {

        let damageOutput = damage_ouput ? damage_ouput : 0;
        let damageTaken = damage_taken ? damage_taken : 0;

        const update = {
            fight_id: fight_id,
            round_id: round_id,
            char_id: char_id,
            damage_output: eval(damageOutput),
            damage_taken: eval(damageTaken)
        }

        console.log(update);

        try {
            console.log(`Updating damage for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output, update.damage_taken}`);
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
                            <PlayersListRow key={i}
                                char={char}
                                round={round}
                                fight_id={fight._id}
                                handleDamage={handleDamage}
                                fetchRounds={fetchRounds}
                                handleInitiative={handleInitiative}
                                >

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















// const handleDamageOutput = async (char) => {

    //     // if (char.damage_output !== undefined && char.damage_taken !== undefined && damageOutput !== undefined && fight._id !== undefined && round !== 0) {
        
    //         if (char.damage_output !== undefined && char.damage_taken !== undefined) {

    //             const update = {
    //                 fight_id: fight._id,
    //                 round_id: round,
    //                 char_id: char._id,
    //                 damage_output: eval(damageOutput),
    //                 damage_taken: char.damage_taken
    //             }
        
    //             try {
    //                 console.log(`Updating damage for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output ? update.damage_output : update.damage_taken}`);
    //                 const response = await axios
    //                     .post('/api/rounds', update);
            
    //                 console.log(response);
    //             } 
    //             catch (error) {
    //                 console.error(`There was an error updating damage for char: ${update.char_id} 
    //                             for fight ${update.fight_id} round ${update.round_id}: ${error}`)
    //             }
    
    //             // fight._id !== undefined && round !== 0 && damageOutput !== undefined
    
    //         } else if (round !== 0) {
    
    //             console.log("CREATING NEW ROUND")
    
    //             const roundToAdd = {
    //                 fight_id: fight._id,
    //                 round_id: round,
    //                 char_id: char._id,
    //                 damage_output: eval(damageOutput),
    //                 damage_taken: 0
    //             }
        
    //             console.log(roundToAdd)
    //             try {
    //                 console.info(`Creating round: ${roundToAdd.round_id} for fight: ${roundToAdd.fight_id} for ${roundToAdd.char_id}.`)
    //                 const response = await axios
    //                     .post('/api/rounds', roundToAdd);
                
    //                 console.log(response.data);
    //             } 
    //             catch (error) {
    //                 console.error(`There was an error creating round: ${roundToAdd.round_id} for fight: 
    //                 ${roundToAdd.fight_id} for ${roundToAdd.char_id}.: ${error}`)
    //             }
                
    //         } else {
    //             console.log("Cannot update a round for a fight/round that does not exist.")
    //         }
    
    //         await fetchRounds();
    // }


    // const handleDamageTaken = async (char) => {

    //     if (char.damage_output !== undefined && char.damage_taken !== undefined ) {

    //         const update = {
    //             fight_id: fight._id,
    //             round_id: round,
    //             char_id: char._id,
    //             damage_taken: eval(damageTaken),
    //             damage_output: char.damage_output
    //         }
    
    //         try {
    //             console.log(`Updating damage for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output ? update.damage_output : update.damage_taken}`);
    //             const response = await axios
    //                 .post('/api/rounds', update);
        
    //             console.log(response);
    //         } 
    //         catch (error) {
    //             console.error(`There was an error updating damage for char: ${update.char_id} 
    //                         for fight ${update.fight_id} round ${update.round_id}: ${error}`)
    //         }

    //         // if (fight._id !== undefined && round !== 0 && damageTaken !== undefined)

    //     } else if (round !== 0) {

    //         console.log("CREATING NEW ROUND")
            
    //         const roundToAdd = {
    //             fight_id: fight._id,
    //             round_id: round,
    //             char_id: char._id,
    //             damage_output: 0,
    //             damage_taken: eval(damageTaken)
    //         }
    
    //         console.log(roundToAdd)
    //         try {
    //             console.info(`Creating round: ${roundToAdd.round_id} for fight: ${roundToAdd.fight_id} for ${roundToAdd.char_id}.`)
    //             const response = await axios
    //                 .post('/api/rounds', roundToAdd);
            
    //             console.log(response.data);
    //         } 
    //         catch (error) {
    //             console.error(`There was an error creating round: ${roundToAdd.round_id} for fight: 
    //             ${roundToAdd.fight_id} for ${roundToAdd.char_id}.: ${error}`)
    //         }
    //     }

    //     else {
    //         console.log("Cannot update a round for a fight/round that does not exist.")
    //     }
        
    //     await fetchRounds();
    // };


// const createRound = async ({char, damageOutput, damageTaken}) => {

    //     let damage_output;
    //     let damage_taken;

    //     if (damageOutput === null && damageTaken !== null) {
    //         damage_output = 0;
    //         damage_taken = damageTaken;
    //     } else if (damageTaken === null && damage_output !== null) {
    //         damage_output = damageOutput;
    //         damage_taken = 0;
    //     } else {
    //         damage_output = 0;
    //         damage_taken = 0;
    //     }

    //     const roundToAdd = {
    //         fight_id: fight._id,
    //         round_id: round,
    //         char_id: char._id,
    //         damage_output: eval(damage_output),
    //         damage_taken: eval(damage_taken)
    //     }

    //     console.log(roundToAdd)
    //     try {
    //         console.info(`Creating round: ${roundToAdd.round_id} for fight: ${roundToAdd.fight_id} for ${roundToAdd.char_id}.`)
    //         const response = await axios
    //             .post('/api/rounds', roundToAdd);
        
    //         console.log(response.data);
    //     } 
    //     catch (error) {
    //         console.error(`There was an error creating round: ${roundToAdd.round_id} for fight: 
    //         ${roundToAdd.fight_id} for ${roundToAdd.char_id}.: ${error}`)
    //     }
        
    // }

    // const updateRoundDamageTaken = async ({char, damageTaken}) => {

    //     const update = {
    //         fight_id: fight._id,
    //         round_id: round,
    //         char_id: char._id,
    //         damage_taken: eval(damageTaken),
    //         damage_output: char.damage_output
    //     }

    //     try {
    //         console.log(`Updating damage for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output ? update.damage_output : update.damage_taken}`);
    //         const response = await axios
    //             .post('/api/rounds', update);
    
    //         console.log(response);
    //     } 
    //     catch (error) {
    //         console.error(`There was an error updating damage for char: ${update.char_id} 
    //                     for fight ${update.fight_id} round ${update.round_id}: ${error}`)
    //     }
    // };


    // const updateRoundDamageOutput = async ({char, damageOutput}) => {

    //     const update = {
    //         fight_id: fight._id,
    //         round_id: round,
    //         char_id: char._id,
    //         damage_output: eval(damageOutput),
    //         damage_taken: char.damage_taken
    //     }

    //     try {
    //         console.log(`Updating damage for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output ? update.damage_output : update.damage_taken}`);
    //         const response = await axios
    //             .post('/api/rounds', update);
    
    //         console.log(response);
    //     } 
    //     catch (error) {
    //         console.error(`There was an error updating damage for char: ${update.char_id} 
    //                     for fight ${update.fight_id} round ${update.round_id}: ${error}`)
    //     }
    // };
