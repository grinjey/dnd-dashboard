import PlayerNavDropdown from "../dropdown/player-nav-dropdown";
import { FormModalContainer } from "../modal/modal";
import { PlayerAddForm, PlayerRemoveForm } from "../forms";
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
            <PlayerNavDropdown 
                addModal={<FormModalContainer 
                    triggerText={'Add Player'} 
                    form={ <PlayerAddForm 
                        handleSubmit={handleCharSubmit} 
                        setName={setName} 
                        formId="playerAdd"/>} 
                    formId="playerAdd"
                    border="success"/>}
                removeModal={<FormModalContainer 
                    triggerText={'Remove Player'} 
                    form={ <PlayerRemoveForm 
                        handleSubmit={handleCharRemoveSubmit} 
                        setName={setName} 
                        formId="playerRemove"/>} 
                    formId="playerRemove"
                    border="danger"/>}
            />
    );

};

export default PlayerDashboardTitle;