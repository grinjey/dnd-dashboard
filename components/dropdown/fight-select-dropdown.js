import { ButtonGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

const FightSelectDropdown = ({fights, selectFight}) => {

    return (

        <Dropdown as={ButtonGroup} onSelect={(e) => {selectFight(e)}}>
            <Dropdown.Toggle className="btn-dark btn-sm" id="filter-stats">Select Fight</Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark border-black dropdown-menu-dark">
                {fights.length > 0 ? (
                        fights.map((fight) => (
                            <Dropdown.Item key={fight._id} eventKey={fight._id}>{fight.fight_name}</Dropdown.Item>
                            )
                        )
                        ) : (
                            <div className='d-flex justify-content-center'>No Fights...</div>
                        )
                    }

            </Dropdown.Menu>
        </Dropdown>

    );
};

export default FightSelectDropdown;