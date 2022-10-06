import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const CheckboxDropdown = ({content, label, showLabel, onChange}) => {

    
    return (

        <Dropdown >
        <Dropdown.Toggle as={"div"} role="button" id="filter-stats">{showLabel ? label : ''}</Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark border-black dropdown-menu-dark" >
            

            {Object.keys(content).map((c) => {
                if (content[c] === true) {
                    return <Form key={c} className="ps-3"><Form.Check onChange={(e) => onChange(e)} type="checkbox" id={c} label={c} checked/></Form>
                } else {
                    return <Form key={c} className="ps-3"><Form.Check onChange={(e) => onChange(e)} type="checkbox" id={c} label={c} checked={false}/></Form>
                }
                
            })
            }
        
        </Dropdown.Menu>

    </Dropdown>

    
    )

};

export default CheckboxDropdown;