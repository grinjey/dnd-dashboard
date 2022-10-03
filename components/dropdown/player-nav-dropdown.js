import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function PlayerNavDropdown({addModal, removeModal}) {

    return (
        <Navbar variant="dark" expand="lg" >
            <Navbar.Brand className='text-secondary' href="#home" style={{fontSize : "45px"}}>Players</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
            <Nav>
                <NavDropdown style={{fontSize : "15px"}}
                bg="dark"
                id="nav-dropdown-dark-example"
                title="Add/Remove"
                menuVariant="dark"
                >
                <div className='d-flex justify-content-center pb-2'>{addModal}</div>
                <div className='d-flex justify-content-center'>{removeModal}</div>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
    
}