import { Cell } from "../cell/cell";
import CellSubmit from '../cell/cell-with-submit';
import Timer from '../timer/timer';
import { useState } from "react";
import axios from "axios";


export const PlayersListRow = ({char, initiative, handleInitiative, handleDamageOutput, handleDamageTaken, fetchRounds}) => {

  const [damageOutput, setDamageOutput] = useState(null);
  const [damageTaken, setDamageTaken] = useState(null);

  const submitDamageOutput = async () => {
    if (damageOutput !== null && damageOutput !== undefined && damageOutput !== '') {

      await handleDamageOutput({char, damageOutput});
    }
    
  };

  const submitDamageTaken = async () => {
    if (damageTaken !== null && damageTaken !== undefined && damageTaken !== '') {
      await handleDamageTaken({char, damageTaken});
    }
  }

  const handleUpdateTime = async ({char, seconds}) => {

    if (char._id !== undefined && char.fight_id !== undefined && char.round_id !== 0) {
        const update = {
            fight_id: char.fight_id,
            round_id: char.round_id,
            char_id: char._id,
            round_time: Number(seconds),
        }

        const response = await axios
            .put('/api/time', update);
    
        console.log(response.data);

        await fetchRounds();

    } else {
        console.log("Cannot update round time when not enough info present");
    }
}

  return (

    <tr className='bg-secondary align-middle fw-bold text-black text-center'>
      <td><span>{char.name}</span></td>
      <td><span><Cell value={initiative} onChange={(e) => handleInitiative(e, char._id)}/></span></td>
      <td><span><CellSubmit value={char.damage_output} editValue={damageOutput} onChange={setDamageOutput} onSubmit={submitDamageOutput}/></span></td>
      <td><span><CellSubmit value={char.damage_taken} onChange={setDamageTaken} onSubmit={submitDamageTaken}/></span></td>
      <td><Timer onSubmit={handleUpdateTime} char={char}></Timer></td>
        

  </tr>

  );

};