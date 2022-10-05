import { Cell } from "../cell/cell";
import CellSubmit from '../cell/cell-with-submit';
import Timer from '../timer/timer';
import { useState } from "react";


export const PlayersListRow = ({char, initiative, handleInitiative, handleDamageOutput, handleDamageTaken, handleUpdateTime}) => {

  const [damageOutput, setDamageOutput] = useState(null);
  const [damageTaken, setDamageTaken] = useState(null);

  const submitDamageOutput = async () => {
    if (damageOutput !== null && damageOutput !== undefined && damageOutput !== '') {

      await handleDamageOutput({char, damageOutput});
    }
    setDamageOutput(null);
    
  };

  const submitDamageTaken = async () => {
    if (damageTaken !== null && damageTaken !== undefined && damageTaken !== '') {
      await handleDamageTaken({char, damageTaken});
    }
    setDamageTaken(null);
  }

  return (

    <tr className='bg-secondary align-middle fw-bold text-black text-center'>
      <td><span>{char.name}</span></td>
      <td><span><Cell value={initiative} onChange={(e) => handleInitiative(e, char._id)}/></span></td>
      <td><span><CellSubmit value={char.damage_output} editValue={damageOutput} onChange={setDamageOutput} onSubmit={() => submitDamageOutput()}/></span></td>
      <td><span><CellSubmit value={char.damage_taken} onChange={setDamageTaken} onSubmit={() => submitDamageTaken()}/></span></td>
      {/* <td><Timer onSubmit={handleUpdateTime} char={char}></Timer></td> */}
        

  </tr>

  );

};