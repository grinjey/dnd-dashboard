// import PlayerNavDropdown from "../dropdown/player-nav-dropdown";
import { FormModalContainer } from "../modal/modal";
import { PlayerAddForm, PlayerRemoveForm } from "../forms";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { charCreate, charRemove } from "../../requests/chars-api";

const PlayerDashboardTitle = ({ chars, fetchChars, fetchInitiatives }) => {

    const [name, setName] = useState('');

    const handleCharCreate = async () => {
        await charCreate(name);
        await fetchChars();
        
    };

    const handleCharSubmit = async (event) => {
        event.preventDefault();
        // Check if all fields are filled
        if (name.length > 0) {
            await handleCharCreate()
    
          // Reset all input fields
        setName('');
        }
    };

    const handleCharRemove = async (id, name) => {

        // Send DELETE request to '/api/chars' endpoint
        await charRemove(id, name);
        await fetchChars();
        await fetchInitiatives();
    };

    const handleCharRemoveSubmit = async (event) => {
        event.preventDefault();
        if (name.length > 0) {
            const charsToRemove = chars.filter(el => (el.name === name));
            for (let i=0; i < charsToRemove.length; i++) {
                await handleCharRemove(charsToRemove[i]._id, charsToRemove[i].name);
            }
            setName('');
        }
    };

    return (

        <Navbar className='text-white mb-3' variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
            <Navbar.Brand className='border-bottom border-white fw-bold' role="div" style={{fontSize: "30px"}}>Players</Navbar.Brand>
            <Navbar.Toggle aria-controls="player-nav" />
            <Navbar.Collapse id="player-nav">
                <Nav>
                <Dropdown>
                <Dropdown.Toggle className='text-white-50 fw-bold' as={"div"} role="button" style={{fontSize: "20px"}} id="playerOptions">Options</Dropdown.Toggle>
                <Dropdown.Menu className='dropdown-menu-dark border border-secondary bg-dark'> 

                    <Dropdown.Item> 
                        <FormModalContainer 
                            triggerText={'Add Player'} 
                            form={ <PlayerAddForm  
                                setName={setName} 
                                formId="playerAdd"/>}
                            handleSubmit={handleCharSubmit}
                            border="success"/> 
                    </Dropdown.Item>

                    <Dropdown.Item> 
                        <FormModalContainer 
                            triggerText={'Remove Player'} 
                            form={ <PlayerRemoveForm  
                                setName={setName} 
                                formId="playerRemove"/>}
                            handleSubmit={handleCharRemoveSubmit} 
                            border="danger"/> 
                    </Dropdown.Item>

                </Dropdown.Menu>

                </Dropdown>
                </Nav>
                
            </Navbar.Collapse>
            </Container>
            
        </Navbar>
    );

};

export default PlayerDashboardTitle;