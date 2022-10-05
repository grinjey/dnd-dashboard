import {useState, useEffect, useCallback} from "react";
import { Card, Stack, Button } from "react-bootstrap";
import { FightAddForm } from "../forms";
import FormModalContainer from "../modal/modal";
import ConfirmDeleteModal from "../modal/confirm-delete-modal";
import FightSelectDropdown from "../dropdown/fight-select-dropdown";
import RoundSelectDropdown from "../dropdown/round-select-dropdown";
import { addFight, addFightRound, deleteFight} from "../../requests/fights-api";
import { addBatchRounds, deleteRound } from "../../requests/rounds-api";


const FightOptions = ({fight, fights, round, setRound, setFight, fetchFights, fetchRounds}) => {
    
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
            await handleBatchRoundInsert(fightId, roundId);
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
        <Card className="py-2 px-2 bg-secondary d-flex flex-wrap" border="dark">
            <Card.Title className="text-center text-black fw-bold border-bottom border-dark pb-1">Fight Options</Card.Title>
            <Card.Title className="border-bottom border-dark py-1">
                <div className="d-flex flex-row justify-content-around">
                        <div className="text-black">
                            <span> Current Fight: </span>
                            <span style={{paddingLeft: "5px", color: "#FFD700"}}> {fight.fight_name ? fight.fight_name : "N/A"} </span>
                        </div>
                        <div className="text-black">
                            <span> Current Round: </span>
                            <span className="fw-bold" style={{paddingLeft: "5px", paddingRight : "2px", color: "#8B008B"}}> {round ? round : "N/A"} </span>
                        </div>  
                </div>
            </Card.Title>
            <Stack direction="horizontal" className="d-flex justify-content-center" gap={5}>

                    <Stack direction="horizontal" gap={2}>
                        <FightSelectDropdown fights={fights} selectFight={selectFight}></FightSelectDropdown>
                        <FormModalContainer triggerText={'Create New Fight'} form={ <FightAddForm handleSubmit={handleFightAdd} setFight={setFightToCreate} formId="fightAdd"/>} formId="fightAdd"/>
                        <ConfirmDeleteModal triggerText={"Delete Fight"} onSubmit={handleFightDelete} itemToDelete={`Fight: ${fight.fight_name}`}></ConfirmDeleteModal>
                    </Stack>
                    
                    
                    <Stack direction="horizontal" gap={2}>
                        <div className="ms-auto">
                            <RoundSelectDropdown fight={fight} setRound={setRound}/>
                        </div>
                        <Button variant="dark" size="sm" onClick={createNewRound}>Create Round</Button>
                        <ConfirmDeleteModal triggerText={"Delete Last Round"} onSubmit={handleRoundDelete} itemToDelete={`Round ${round}`}></ConfirmDeleteModal>
                    </Stack>

            </Stack>
        </Card>
    );

};

export default FightOptions;