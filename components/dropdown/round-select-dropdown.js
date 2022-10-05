import { useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

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

        <Dropdown as={ButtonGroup} onSelect={(e) => {handleSelect(e)}}>
            <Dropdown.Toggle className="btn-dark btn-sm" id="select-round">Select Round</Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark border-black dropdown-menu-dark">

                { roundsToFill.length > 0 ? 
                    (roundsToFill.map((r) => <Dropdown.Item key={r} eventKey={r}> {r} </Dropdown.Item>)) : 
                    (<div className='d-flex justify-content-center'>No Rounds...</div>)
                }

            </Dropdown.Menu>
        </Dropdown>

    );
};

export default RoundSelectDropdown;