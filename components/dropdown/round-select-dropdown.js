import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const RoundSelectDropdown = ({fight, setRound}) => {

    const [roundsToFill, setRoundsToFill] = useState([])

    const handleSelect=(e)=>{
        setRound(Number(e));
    };

    useEffect(() => {
        const rounds = Array.from({ length: fight.rounds }, (v, i) => ++i)
        setRoundsToFill(rounds);

    }, [fight]
    );

    return (
        <DropdownButton
        title="Select Round"
        id="dropdown-menu-align-right"
        variant='light'
        size='sm'
        onSelect={handleSelect}
        >
        { roundsToFill.length > 0 ? 
        (roundsToFill.map((r) => <Dropdown.Item key={r} eventKey={r}> {r} </Dropdown.Item>)) : 
        (<div className='d-flex justify-content-center'>No Rounds...</div>)
        
        }
        </DropdownButton>
    );
};

export default RoundSelectDropdown;