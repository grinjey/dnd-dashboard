import React from 'react';
import { Cell } from "../cell/cell";
import CellSubmit from '../cell/cell-with-submit';


export const PlayersListRow = (props) => {
  
  return (

    <tr className='bg-secondary'>
      <td><span className="fw-bold text-black">{props.char.name}</span></td>
      <td><span className="fw-bold text-black"><div className="text-gray">{props.char.playerclass}</div></span></td>
      <td><span className="fw-bold text-black"><Cell value={props.initiative} onChange={(e) => props.handleInitiative(e, props.char._id)}/></span></td>
      <td><span className="fw-bold text-black"><CellSubmit value={props.char.damage_output} onChange={props.setDamageOutput} onSubmit={() => props.handleDamageOutput(props.char)}/></span></td>
      <td><span className="fw-bold text-black"><CellSubmit value={props.char.damage_taken} onChange={props.setDamageTaken} onSubmit={() => props.handleDamageTaken(props.char)}/></span></td>

  </tr>

  );

};