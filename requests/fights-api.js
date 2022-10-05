import axios from "axios";

export async function getFightsAll() {
    
    try {
        const response = await axios.get('/api/fights')
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error(`There was an error getting all character info.`)
    }
};

export async function addFight(fightToCreate) {
    
    try {
        console.log(`Creating fight: ${fightToCreate}`)
        const response = await axios
            .post('/api/fights', {
                fight_name: fightToCreate,
                rounds: 0
            })
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error creating fight ${fightToCreate}}: ${error}`)
    }
};

export async function addFightRound(fight_id, rounds) {
    
    try {
        console.log(`Creating new round for fight: ${fight_id}`)
        const response = await axios
        .put('/api/fights', 
        {
            _id: fight_id,
            rounds: rounds
        })
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error updating Fight: ${fight_id} rounds: ${error}`)
    }
};

export async function deleteFight({fight}) {
    
    console.log(fight);

    try {
        console.log(`Deleting fight: ${fight}`)
        const response = await axios
        .delete('/api/fights', {data: fight})
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error deleting Fight: ${fight} rounds: ${error}`)
    }
};