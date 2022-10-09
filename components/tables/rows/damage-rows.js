import CellSubmit from "../../cell/cell-with-submit";
import { useState } from "react";
import axios from "axios";


const PlayerDamageRows = ({char, fetchRounds, fight_id, round}) => {

    const [damageOutput, setDamageOutput] = useState('');
    const [damageTaken, setDamageTaken] = useState('');


    const handleDamage = async ({type}) => {

      let damage_output;
      let damage_taken;
      let set = false;

      if (type === "out") {
        if (damageOutput !== null && damageOutput !== undefined && damageOutput !== '') {
          damage_output = damageOutput; 
          damage_taken = char.damage_taken;
          set = true;
        }
      } else if (type === "taken") {
        if (damageTaken !== null && damageTaken !== undefined && damageTaken !== '') {
          damage_output = char.damage_output; 
          damage_taken = damageTaken;
          set = true;
        }
      }

      if (set) {

        let out = damage_output ? damage_output : 0;
        let taken = damage_taken ? damage_taken : 0;

        const update = {
            fight_id: fight_id,
            round_id: round,
            char_id: char._id,
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
        setDamageOutput(null);
        setDamageTaken(null);
      }
  }

  return (

      <>
      <td className=""><CellSubmit value={char.damage_output} onChange={setDamageOutput} onSubmit={() => handleDamage({type: "out"})}/></td>
      <td className=""><CellSubmit value={char.damage_taken} onChange={setDamageTaken} onSubmit={() => handleDamage({type: "taken"})}/></td>
      </>
      
  )

}

export default PlayerDamageRows;