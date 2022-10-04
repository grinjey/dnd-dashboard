import axios from 'axios';

// export async function getRounds(fight_id, round_id) {
    
//     try {
//         console.log(`fetching round ${round_id} for fight ${fight_id} info.`)
//         const response = await axios
//             .get('/api/rounds', {params: {fight_id: fight_id, round_id: round_id}})
//         console.log(response);
//         return response.data;
//     } 
//     catch (error) {
//         console.error(`fetching round ${round_id} for fight ${fight_id} info.: ${error}`)
//     }

// };

export async function getRounds() {
    
    try {
        console.log(`fetching rounds.`)
        const response = await axios
            .get('/api/rounds')
        console.log(response);
        return response.data;
    } 
    catch (error) {
        console.error(`fetching round ${round_id} for fight ${fight_id} info.: ${error}`)
    }

};

export async function addBatchRounds(collection) {
    
    try {
        console.log(`Creating ${collection.length} rounds for fight: ${collection[0].fight_id}.`)
        const response = await  axios
        .post('/api/rounds-batch', {
            collection: collection
        })
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error for Batch Insert: ${error}`)
    }
    
};

export async function updateDamage(update) {
    try {
        console.log(`Updating damage output for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.damage_output}`);
        const response = await axios
            .put('/api/rounds', update);
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error updating damage output for char: ${update.char_id} 
                    for fight ${update.fight_id} round ${update.round_id}: ${error}`)
    }
};

export async function addRound(roundToAdd) {
    
    try {
        console.info(`Creating round: ${roundToAdd.round_id} for fight: ${roundToAdd.fight_id} for ${roundToAdd.char_id}.`)
        const response = await axios
            .post('/api/rounds', roundToAdd);
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error creating round: ${roundToAdd.round_id} for fight: 
        ${roundToAdd.fight_id} for ${roundToAdd.char_id}.: ${error}`)
    }
};