import React from 'react';
import { Cell } from "../cell/cell";
import CellSubmit from '../cell/cell-with-submit';


export const PlayersListRow = (props) => {
  
  return (

    <tr>
      <td><span className="fw-bold">{props.char.name}</span></td>
      <td><span className="fw-normal"><div className="small text-gray">{props.char.playerclass}</div></span></td>
      <td><span className="fw-normal"><Cell value={props.initiative} onChange={(e) => handleInitiative(e, props.char._id)}/></span></td>
      <td><span className="fw-normal"><CellSubmit value={props.char.damage_output} onChange={props.setDamageOutput} onSubmit={() => props.handleDamageOutput(props.char)}/></span></td>
      <td><span className="fw-normal"><CellSubmit value={props.char.damage_taken} onChange={props.setDamageTaken} onSubmit={() => props.handleDamageTaken(props.char)}/></span></td>

  </tr>

  );

};