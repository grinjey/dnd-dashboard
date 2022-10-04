import axios from 'axios';

export async function updateTime(update) {
    try {
        console.log(`Updating round time for char: ${update.char_id} for fight ${update.fight_id} round ${update.round_id} to: ${update.round_time}`);
        const response = await axios
            .put('/api/time', update);
    
        console.log(response.data);
    } 
    catch (error) {
        console.error(`There was an error updating round time for char: ${update.char_id} 
                    for fight ${update.fight_id} round ${update.round_id}: ${error}`)
    }
};