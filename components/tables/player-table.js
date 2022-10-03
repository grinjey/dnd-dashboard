import {useState, useEffect, useCallback} from "react";
import PlayerList from "../tables/player-list";
import FightOptions from "../dashboard/fight-options";
import { getRounds, addBatchRounds } from "../../api/rounds-api";
import { getFightsAll, addFight, addFightRound } from "../../api/fights-api";

const PlayerTable = ({chars}) => {

    const [fight, setFight] = useState({});
    const [fights, setFights] = useState([]);
    const [fightToCreate, setFightToCreate] = useState('');
    const [createdFight, setCreatedFight] = useState('');
    const [round, setRound] = useState(0);
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        fetchFights();
    }, []
    );

    const selectNewFight = useCallback(() => {
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
        
    }, [fights, createdFight]
    );

    useEffect(() => {
        
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
        
    }, [fights, fight._id, selectNewFight]
    );

    const fetchRounds = useCallback(async () => {

        if (fight._id !== undefined && round !== undefined) {
            const fight_id = fight._id;
            const round_id = Number(round);
            const roundsInfo = await getRounds(fight_id, round_id);
            setRounds(roundsInfo.data);
        };
    }, [fight, round]
    )

    useEffect(() => {

        fetchRounds();

    }, [round, fight, fetchRounds]
    );

    const fetchFights = async () => {
        
        const fightData = await getFightsAll();
        setFights(fightData.data);
    };

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

    const handleBatchRoundInsert = async (fightId, roundId) => {
        const collection = [];

        for (let i = 0; i < chars.length; i++) {
            collection.push({
                fight_id: fightId,
                round_id: roundId,
                char_id: chars[i]._id,
                damage_output: 0,
                damage_taken: 0
            })
        }

        console.log(collection);

        return await addBatchRounds(collection);

    }

    const handleCreateNewFightRound = async (rounds) => {
        const fight_id = fight._id;
        await addFightRound(fight_id, rounds)
    }

    const createNewRound = async () => {
        if (fight._id !== undefined) {
            const fightId = fight._id;
            const newRound = fight.rounds + 1;
            const roundId = Number(newRound);
            await handleCreateNewFightRound(roundId);
            await handleBatchRoundInsert(fightId, roundId);
            await fetchFights();
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
        <FightOptions 
            fight={fight}
            fights={fights}
            round={round}
            setRound={setRound}
            selectFight={selectFight}
            setFightToCreate={setFightToCreate}
            handleFightAdd={handleFightAdd}
            createNewRound={createNewRound}
            />
        <PlayerList chars={chars} round={round} rounds={rounds} fetchRounds={fetchRounds} fight={fight}/>
        </>
    );

}

export default PlayerTable;
