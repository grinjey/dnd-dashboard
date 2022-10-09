import { useState, useEffect } from "react";
import { Container, Navbar, Dropdown } from "react-bootstrap";
import { FightAddForm } from "../forms";
import FormModalContainer from "../modal/modal";
import ConfirmDeleteModal from "../modal/confirm-delete-modal";
import FightSelectDropdown from "../dropdown/fight-select-dropdown";
import RoundSelectDropdown from "../dropdown/round-select-dropdown";
import { addFight, addFightRound, deleteFight} from "../../requests/fights-api";
import { addBatchRounds, deleteRound } from "../../requests/rounds-api";


const FightOptions = ({chars, fight, fights, round, setRound, setFight, fetchFights, fetchRounds, fetchInitiatives}) => {
    
    const [fightToCreate, setFightToCreate] = useState('');
    const [createdFight, setCreatedFight] = useState('');

    

    useEffect(() => {
        
        const selectNewFight = () => {
            if (createdFight.length > 0) {
                console.log("selecting new fight")
                const newFight = fights.find((item) => item.fight_name === createdFight);
                if (newFight !== undefined) {
                    console.log(newFight);
                    setFight(newFight);
                    setRound(Number(newFight.rounds));
                    setCreatedFight('');
                }
            }
            
        }

        const updateFight = () => {
            if (fight._id !== undefined) {
                console.log("updating fights")
                const selectedFight = fights.find((item) => item._id === fight._id);
                setFight(selectedFight);
                setRound(Number(selectedFight.rounds));
            } 
        }

        updateFight();
        selectNewFight();
        
    }, [fights, fight._id, createdFight]
    );

    const submitFightAdd = async () => {
        await addFight(fightToCreate);
        await fetchFights();
    }

    const handleFightAdd = async (event) => {
        event.preventDefault();
        console.log(fights);
        if (fightToCreate.length > 0) {
            if (fights.find((item) => item.fight_name === fightToCreate) === undefined) {
                await submitFightAdd();
                setCreatedFight(fightToCreate);
                setFightToCreate('');

            } else {
                console.log("Fight already created");
            }
        };
    };

    const handleFightDelete = async () => {
        if (fight !== {} && fight._id !== undefined) {
            console.log("DELETING FIGHT: ", fight.fight_name, fight._id)
            await deleteFight({fight: fight});
            setFight({});
            setRound(0);
            await fetchFights();
            await fetchRounds();
            await fetchInitiatives();
            
        } else {
            console.log("Cannot delete fight if none selected.")
        }

    };

    const handleRoundDelete = async () => {
        if (fight !== {} && fight._id !== undefined) {
            console.log("DELETING LAST ROUND FOR: ", fight.fight_name)
            await deleteRound({fight_id: fight._id, round_id: fight.rounds});
            await fetchFights();
            await fetchRounds(); 
        } else {
            console.log("Cannot delete last round for fight if none selected.")
        }
    }

    const handleBatchRoundInsert = async (fightId, roundId) => {
        const collection = [];

        for (let i = 0; i < chars.length; i++) {
            collection.push({
                fight_id: fightId,
                round_id: roundId,
                char_id: chars[i]._id,
                damage_output: null,
                damage_taken: null
            })
        }

        console.log(collection);

        return await addBatchRounds(collection);

    }

    const handleCreateNewFightRound = async (newRounds) => {
        const fight_id = fight._id;
        await addFightRound(fight_id, newRounds)
    }

    const createNewRound = async () => {
        if (fight._id !== undefined) {
            const fightId = fight._id;
            const newRounds = fight.rounds + 1;
            const roundId = Number(newRounds);
            await handleCreateNewFightRound(roundId);
            // await handleBatchRoundInsert(fightId, roundId);
            await fetchFights();
            await fetchRounds();
        }
    }

    const selectFight = (FightId) => {
        const convFightId = FightId;
        const selectedFight = fights.find((item) => item._id === convFightId);
        setFight(selectedFight);
        setRound(Number(selectedFight.rounds));
    };



    return (

        <>
        <Container className="bg-dark border-bottom border-secondary text-white-50" fluid>

            <Navbar variant="dark" expand="lg">
                <Container fluid>
                <Navbar.Brand><h4 className="text-center fw-bold py-1 border-bottom border-secondary">Fight Options</h4></Navbar.Brand>
                <Navbar.Toggle className="bg-dark" aria-controls="fight-options" />
                

                <Navbar.Collapse className="justify-content-around" id="fight-options">
                    
                    <div role="button" className="fw-bold pb-1">
                        <FightSelectDropdown fights={fights} selectFight={selectFight}></FightSelectDropdown>
                    </div>
                    
                    <Dropdown className="pb-1"> 
                    <Dropdown.Toggle className='fw-bold' as={"text"} role="button" style={{fontSize: "15px"}}>Fight Add/Remove</Dropdown.Toggle>
                        <Dropdown.Menu className='dropdown-menu-dark bg-dark'>
                            <Dropdown.Item> <FormModalContainer 
                                triggerText={'Create New Fight'} 
                                form={ <FightAddForm handleSubmit={handleFightAdd} setFight={setFightToCreate} formId="fightAdd"/>} 
                                formId="fightAdd" 
                                border="success"/> 
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <ConfirmDeleteModal triggerText={"Delete Fight"} onSubmit={handleFightDelete} itemToDelete={`Fight: ${fight.fight_name}`}></ConfirmDeleteModal>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <div role="button" className="fw-bold pb-1">
                        <RoundSelectDropdown fight={fight} setRound={setRound}/>
                    </div>

                    <Dropdown className="pb-1">
                        <Dropdown.Toggle role="button" className='fw-bold' as={"text"} style={{fontSize: "15px"}}>Round Add/Remove</Dropdown.Toggle>
                        <Dropdown.Menu className='dropdown-menu-dark bg-dark'>
                            <Dropdown.Item>
                                <div variant="dark" size="sm" onClick={createNewRound}>Create Round</div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <ConfirmDeleteModal triggerText={"Delete Last Round"} onSubmit={handleRoundDelete} itemToDelete={`Round ${round}`}></ConfirmDeleteModal>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>

                </Container>
            </Navbar>

        
        </Container>

        <Container className="bg-dark text-white text-center d-flex justify-content-around pt-1" fluid>
                <div className="pb-1 pe-2">
                    <span><h6 className="fw-bold"> Current Fight </h6></span>
                    <span className="fw-bold" style={{color: "#00ced1"}}> {fight.fight_name ? fight.fight_name : "N/A"} </span>
                </div>
                <div className="pb-1">
                    <span><h6 className="fw-bold"> Current Round </h6></span>
                    <span className="fw-bold" style={{paddingRight : "2px", color: "#00ced1"}}> {round ? round : "N/A"} </span>
                </div>
        </Container>

        </>
    );

};

export default FightOptions;