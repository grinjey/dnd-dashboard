import CellSubmit from "../cell/cell-with-submit";
import { useState } from "react";
import axios from "axios";

export const InitiativeRow = ({char, fight_id, fetchInitiatives, round}) => {

    const [initiative, setInitiative] = useState(0);

    const handleInitiative = async () => {

        const update = {
            fight_id: fight_id,
            char_id: char._id,
            initiative: eval(initiative)
        };

        console.log(update);

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

    const submitInitiative = async () => {
        if (initiative !== null && initiative !== undefined && initiative !== 0 && initiative !== '') {
    
          await handleInitiative({
            fight_id: fight_id,
            char_id: char._id,
            initiative: initiative
          });
    
          setInitiative(0)
        } 
      }

    return (

        <td className="border border-right border-dark">{round === 1 ? 
            <span><CellSubmit value={char.initiative} onChange={setInitiative} onSubmit={submitInitiative}/></span> :
            <span>{char.initiative ? char.initiative : "-"}</span>}
        </td>
    )

}