import { Cell } from "../cell/cell";
import { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import CellSubmit from '../cell/cell-with-submit';
import CheckboxDropdown from "../dropdown/checkbox-dropdown";
import Timer from '../timer/timer';
import axios from "axios";
import { statusColors, statusList } from "../../utils/statuses";



export const PlayersListRow = ({char, round, fight_id, initiative, handleInitiative, handleDamage, fetchRounds}) => {

  const [damageOutput, setDamageOutput] = useState('');
  const [damageTaken, setDamageTaken] = useState('');
  const [badges, setBadges] = useState(<div></div>)
  const [statuses, setStatuses] = useState({});

  useEffect(() => {

    const buildStatusBadges = () => {

      let activeStatuses = [];
      Object.keys(statuses).forEach(key => {if (statuses[key]) activeStatuses.push(key);})
  
      let newBadges = activeStatuses.map(status => {
        return <Badge key={status} bg={statusColors[status]}>{status}</Badge>
      })
      
      let newBadgesDiv = <div>{newBadges}</div>

      setBadges(newBadgesDiv);
  
    };

    buildStatusBadges();

  }, [statuses]
  )

  useEffect(() => {

    let newStatuses = char.statuses;

    if (char.statuses !== undefined) {
      setStatuses(newStatuses);
    }

  }, [fight_id]
  )

  const submitDamageOutput = async () => {
    if (damageOutput !== null && damageOutput !== undefined && damageOutput !== '') {
      await handleDamage({
        fight_id: fight_id, 
        round_id: round, 
        char_id: char._id, 
        damage_ouput: damageOutput, 
        damage_taken: char.damage_taken
      });
    }
  };

  const submitDamageTaken = async () => {
    if (damageTaken !== null && damageTaken !== undefined && damageTaken !== '') {
      await handleDamage({
        fight_id: fight_id, 
        round_id: round, 
        char_id: char._id, 
        damage_ouput: char.damage_output, 
        damage_taken: damageTaken
      });
    }
  };

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

  const handleStatuses = (event) => {
    let status = event.target.id;
    let statusActive = event.target.checked;
    console.log(status, statusActive);
    let newStatuses = Object.assign({}, statuses, {[status]: statusActive});
    setStatuses(newStatuses);

  };

  

  return (

    <tr className='bg-secondary align-middle fw-bold text-black text-center'>
      <td><span>{char.name}</span></td>
      <td><span><Cell value={initiative} onChange={(e) => handleInitiative(e, char._id)}/></span></td>
      <td><span><CellSubmit value={char.damage_output} onChange={setDamageOutput} onSubmit={submitDamageOutput}/></span></td>
      <td><span><CellSubmit value={char.damage_taken} onChange={setDamageTaken} onSubmit={submitDamageTaken}/></span></td>
      <td className="pe-4">{badges ? badges : ''}<CheckboxDropdown label={"Statuses"} showLabel={false} content={statuses} onChange={handleStatuses}></CheckboxDropdown>
      </td>
      <td><span><Timer onSubmit={handleUpdateTime} char={char}></Timer></span></td>
        

  </tr>

  );

};