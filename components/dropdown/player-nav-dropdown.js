import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

export default function PlayerNavDropdown({addModal, removeModal}) {

    return (

        <Navbar className='text-white mb-3' variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
            <Navbar.Brand className='border-bottom border-white fw-bold' href="#home" style={{fontSize: "30px"}}>Players</Navbar.Brand>
            <Navbar.Toggle className='' aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                
                <Dropdown>

                <Dropdown.Toggle className='text-white-50 fw-bold' as={"text"} style={{fontSize: "20px"}}>Options</Dropdown.Toggle>
                <Dropdown.Menu className='dropdown-menu-dark bg-dark'> 

                    <Dropdown.Item> {addModal} </Dropdown.Item>
                    <Dropdown.Item> {removeModal} </Dropdown.Item>

                </Dropdown.Menu>

                </Dropdown>
                

                {/* <Nav style={{fontSize: "15px"}} >
                <NavDropdown title="Options" id="basic-nav-dropdown">

                    <NavDropdown.Item className='' href=""> {addModal} </NavDropdown.Item>
                    <NavDropdown.Item className='' href=""> {removeModal} </NavDropdown.Item>

                </NavDropdown>
                </Nav> */}
                
            </Navbar.Collapse>
            </Container>
            
        </Navbar>

    );
    
}