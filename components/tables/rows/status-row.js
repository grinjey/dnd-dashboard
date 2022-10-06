import CheckboxDropdown from "../../dropdown/checkbox-dropdown";
import { useState, useEffect } from "react";
import { statusColors, statusList, statusTextColors } from "../../../utils/statuses";

const PlayerStatusRow = ({char}) => {

    const [badges, setBadges] = useState(<div></div>)
    const [statuses, setStatuses] = useState({});

    useEffect(() => {

        const buildStatusBadges = () => {
    
          let activeStatuses = [];
          Object.keys(statuses).forEach(key => {if (statuses[key]) activeStatuses.push(key);})
      
          let newBadges = activeStatuses.map(status => {
            // return <Badge key={status} style={{backgroundColor: statusColors[status]}} >{status}</Badge>
            return <span key={status} className="badge" style={{backgroundColor: statusColors[status], color: statusTextColors[status]}}>{status}</span>
          })
          
          let newBadgesDiv = <div>{newBadges}</div>
    
          setBadges(newBadgesDiv);
      
        };
    
        buildStatusBadges();
    
    }, [statuses]
    )

    useEffect(() => {

        setStatuses(statusList);
    
      }, [char.fight_id]
      )

    const handleStatuses = (event) => {
        let status = event.target.id;
        let statusActive = event.target.checked;
        let newStatuses = Object.assign({}, statuses, {[status]: statusActive});
        setStatuses(newStatuses);
    
      };

    return (

        <td className="pe-4">{badges ? badges : ''}<CheckboxDropdown label={"Statuses"} showLabel={false} content={statuses} onChange={handleStatuses}></CheckboxDropdown></td>

    )

}

export default PlayerStatusRow;

