import CellSubmit from "../../cell/cell-with-submit";
import { useState } from "react";
import axios from "axios";


const PlayerInitiativeRow = ({char, round, fetchInitiatives}) => {

    const [initiative, setInitiative] = useState(0);


    const handleInitiative = async () => {
        if (initiative !== null && initiative !== undefined && initiative !== 0 && initiative !== '') {
    
          const update = {
            fight_id: char.fight_id,
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

        <td className="border border-right border-dark">{round === 1 ? 
            <span><CellSubmit value={char.initiative} onChange={setInitiative} onSubmit={() => handleInitiative()}/></span> :
            <span>{char.initiative ? char.initiative : "-"}</span>}
        </td>

    )

}

export default PlayerInitiativeRow;