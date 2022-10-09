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

        <Dropdown onSelect={(e) => {handleSelect(e)}}>
            <Dropdown.Toggle as={"text"} id="select-round">Select Round</Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark border-secondary dropdown-menu-dark">

                { roundsToFill.length > 0 ? 
                    (roundsToFill.map((r) => <Dropdown.Item key={r} eventKey={r}> {r} </Dropdown.Item>)) : 
                    (<Dropdown.Item className='text-center'>No Rounds...</Dropdown.Item>)
                }

            </Dropdown.Menu>
        </Dropdown>

    );
};

export default RoundSelectDropdown;