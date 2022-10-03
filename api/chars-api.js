import axios from 'axios';

export async function getCharsAll() {

    try {
        const response = await axios.get('/api/chars')
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error(`There was an error getting all character info.`)
    }
    

};

export async function charCreate(name, playerclass) {
    
    try {
        console.log(`Creating Char: ${name}, ${playerclass}`);

        const response = await axios
            .post('/api/chars', {
                name: name, 
                playerclass: playerclass
            });
    
        console.log(response);
    } 
    catch (error) {
        console.error(`There was an error creating ${name}: ${error}`)
    }

};

export async function charRemove(id, name) {
    
    try {
        console.log(`Removing Char: ${id}, ${name}`)
        const response = await axios
            .delete('/api/chars', {data: {_id: id}})
    
        console.log(response);
    } 
    catch (error) {
        console.error(`There was an error removing ${name}: ${error}`)
    }

};