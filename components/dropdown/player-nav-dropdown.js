import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

export default function PlayerNavDropdown({addModal, removeModal}) {

    return (
        
        <Navbar className='text-white mb-3' variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
            <Navbar.Brand className='border-bottom border-white fw-bold' href="#home" style={{fontSize: "30px"}}>Players</Navbar.Brand>
            <Navbar.Toggle aria-controls="player-nav" />
            <Navbar.Collapse id="player-nav">
                <Nav>
                <Dropdown>
                <Dropdown.Toggle className='text-white-50 fw-bold' as={"div"} style={{fontSize: "20px"}}>Options</Dropdown.Toggle>
                <Dropdown.Menu className='dropdown-menu-dark border border-secondary bg-dark'> 

                    <Dropdown.Item> {addModal} </Dropdown.Item>
                    <Dropdown.Item> {removeModal} </Dropdown.Item>

                </Dropdown.Menu>

                </Dropdown>
                </Nav>
                
            </Navbar.Collapse>
            </Container>
            
        </Navbar>

    );
    
}