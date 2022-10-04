import { Cell } from "../cell/cell";
import CellSubmit from '../cell/cell-with-submit';
import Stack from 'react-bootstrap/Stack';
import Timer from '../timer/timer';


export const PlayersListRow = (props) => {

  return (

    <tr className='bg-secondary align-middle fw-bold text-black text-center'>
      <td><span>{props.char.name}</span></td>
      <td><span><div>{props.char.playerclass}</div></span></td>
      <td><span><Cell value={props.initiative} onChange={(e) => props.handleInitiative(e, props.char._id)}/></span></td>
      <td><span><CellSubmit value={props.char.damage_output} onChange={props.setDamageOutput} onSubmit={() => props.handleDamageOutput(props.char)}/></span></td>
      <td><span><CellSubmit value={props.char.damage_taken} onChange={props.setDamageTaken} onSubmit={() => props.handleDamageTaken(props.char)}/></span></td>
      <td><Timer onSubmit={props.handleUpdateTime} char={props.char}></Timer></td>
        

  </tr>

  );

};