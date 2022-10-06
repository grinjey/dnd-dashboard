import CellSubmit from "../../cell/cell-with-submit";
import { useState } from "react";
import axios from "axios";


const PlayerDamageRows = ({char, handleDamage}) => {

    const [damageOutput, setDamageOutput] = useState('');
    const [damageTaken, setDamageTaken] = useState('');


    const submitDamageOutput = async () => {
      if (damageOutput !== null && damageOutput !== undefined && damageOutput !== '') {
        await handleDamage({
          fight_id: char.fight_id, 
          round_id: char.round_id, 
          char_id: char._id, 
          damage_output: damageOutput, 
          damage_taken: char.damage_taken
        });
  
        setDamageOutput(null);
  
      }
    };
  
    const submitDamageTaken = async () => {
      if (damageTaken !== null && damageTaken !== undefined && damageTaken !== '') {
        await handleDamage({
          fight_id: char.fight_id, 
          round_id: char.round_id, 
          char_id: char._id, 
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