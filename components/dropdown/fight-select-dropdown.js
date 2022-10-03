import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FightSelectDropdown = ({fights, selectFight}) => {

    const handleSelect=(e)=>{
        selectFight(e);
    };

    return (
        <DropdownButton
        title="Select Fight"
        id="dropdown-menu-align-right"
        variant='light'
        size='sm'
        onSelect={handleSelect}
        >
            {fights.length > 0 ? (
                    fights.map((fight) => (
                        <Dropdown.Item key={fight._id} eventKey={fight._id}>{fight.fight_name}</Dropdown.Item>
                        )
                    )
                    ) : (
                        <div className='d-flex justify-content-center'>No Fights...</div>
                    )
                }
        </DropdownButton>
    );
};

export default FightSelectDropdown;