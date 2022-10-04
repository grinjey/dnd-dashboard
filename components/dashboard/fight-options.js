import { Card, Stack, Button } from "react-bootstrap";
import { FightAddForm } from "../forms";
import FormModalContainer from "../modal";
import FightSelectDropdown from "../dropdown/fight-select-dropdown";
import RoundSelectDropdown from "../dropdown/round-select-dropdown";


const FightOptions = ({fight, fights, round, setRound, selectFight, setFightToCreate, handleFightAdd, createNewRound}) => {
    
    return (
        <Card className="py-2 px-2 bg-secondary d-flex flex-wrap" border="dark">
            <Card.Title className="text-center text-black fw-bold border-bottom border-dark pb-1">Fight Options</Card.Title>
            <Stack direction="horizontal" className="d-flex justify-content-center" gap={2}>
                    <FightSelectDropdown fights={fights} selectFight={selectFight}></FightSelectDropdown>
                    <Card className="py-1 px-2 bg-dark" text="white">
                        <div className="">
                            <span> Current Fight: </span>
                            <span style={{paddingLeft: "5px", color: "red"}}> {fight.fight_name} </span>
                        </div> 
                    </Card>
                    <FormModalContainer triggerText={'Create New Fight'} form={ <FightAddForm handleSubmit={handleFightAdd} setFight={setFightToCreate} formId="fightAdd"/>} formId="fightAdd"/>
                    <div className="ms-auto">
                        <RoundSelectDropdown fight={fight} setRound={setRound}/>
                    </div>
                    <Card className="py-1 px-2 bg-dark" text="white">
                        <div className="">
                            <span> Current Round: </span>
                            <span className="fw-bold" style={{paddingLeft: "5px", color: "#2596be"}}> {round} </span>
                        </div> 
                    </Card>
                    <Button variant="dark" size="sm" onClick={createNewRound}>Create Round</Button>
            </Stack>
        </Card>
    );

};

export default FightOptions;