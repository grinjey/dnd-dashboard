import Stack from "react-bootstrap/Stack";
import PlayerNavDropdown from "../dropdown/player-nav-dropdown";
import { FormModalContainer } from "../modal";
import { PlayerAddForm, PlayerRemoveForm } from "../forms";

const PlayerDashboardTitle = ({ setName, setPlayerClass, handleCharSubmit, handleCharRemoveSubmit, }) => {

    return (
        <Stack direction="horizontal">
            <PlayerNavDropdown 
                addModal={<FormModalContainer 
                    triggerText={'Add New Player'} 
                    form={ <PlayerAddForm 
                        handleSubmit={handleCharSubmit} 
                        setName={setName} 
                        setPlayerClass={setPlayerClass} 
                        formId="playerAdd"/>} 
                    formId="playerAdd"/>}
                removeModal={<FormModalContainer 
                    triggerText={'Remove Player'} 
                    form={ <PlayerRemoveForm 
                        handleSubmit={handleCharRemoveSubmit} 
                        setName={setName} 
                        setPlayerClass={setPlayerClass} 
                        formId="playerRemove"/>} 
                    formId="playerRemove"/>}
            />
            </Stack>
    );

};

export default PlayerDashboardTitle;