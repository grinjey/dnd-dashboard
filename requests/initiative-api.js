import axios from "axios";

export async function getInitsAll() {
    
    try {
        const response = await axios.get('/api/initiative')
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error(`There was an error getting all character info.`)
    }
};