import CellSubmit from "../../cell/cell-with-submit";
import { useState } from "react";
import axios from "axios";


const PlayerDamageRows = ({char, fetchRounds}) => {

    const [damageOutput, setDamageOutput] = useState('');
    const [damageTaken, setDamageTaken] = useState('');


    const handleDamage = async ({damage_output, damage_taken}) => {

        let out = damage_output ? damage_output : 0;
        let taken = damage_taken ? damage_taken : 0;

        const update = {
            fight_id: char.fight_id,
            round_id: char.round_id,
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

    }

    const submitDamageOutput = async () => {
        if (damageOutput !== null && damageOutput !== undefined && damageOutput !== '') {
          await handleDamage({
            damage_output: damageOutput, 
            damage_taken: char.damage_taken
          });
    
          setDamageOutput(null);
    
        }
      };
    
      const submitDamageTaken = async () => {
        if (damageTaken !== null && damageTaken !== undefined && damageTaken !== '') {
          await handleDamage({
            damage_output: char.damage_output, 
            damage_taken: damageTaken
          });
    
          setDamageTaken(null);
    
        }
      };

    return (

        <>
        <td className="border border-right border-dark"><span><CellSubmit value={char.damage_output} onChange={setDamageOutput} onSubmit={submitDamageOutput}/></span></td>
        <td className="border border-right border-dark"><span><CellSubmit value={char.damage_taken} onChange={setDamageTaken} onSubmit={submitDamageTaken}/></span></td>
        </>
        
    )

}

export default PlayerDamageRows;