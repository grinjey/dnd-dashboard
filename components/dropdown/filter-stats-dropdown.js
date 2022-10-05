import { ButtonGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';


const FilterStatsDropdown = ({fights, onSelect, title}) => {

    return (

        <Dropdown as={ButtonGroup} onSelect={(e) => {onSelect(e)}}>
            <Dropdown.Toggle className="btn-dark" id="filter-stats">{title}</Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark border-black dropdown-menu-dark">
                <Dropdown.Item className='text-white' eventKey={0}>All</Dropdown.Item>
                <Dropdown.Divider className='border-white'/>

                {fights.length > 0 ? (
                    fights.map((fight) => (
                        <Dropdown.Item className='text-white' key={fight._id} eventKey={fight._id}>{fight.fight_name}</Dropdown.Item>
                        )
                    )
                    ) : (<div></div>)
                }

            </Dropdown.Menu>
        </Dropdown>

    );
};

export default FilterStatsDropdown;