import axios from "axios";
import Timer from "../../timer/timer";

const PlayerTimeRow = ({char, fetchRounds}) => {

    const handleUpdateTime = async ({seconds}) => {

        if (char._id !== undefined && char.fight_id !== undefined && char.round_id !== 0) {
            const update = {
                fight_id: char.fight_id,
                round_id: char.round_id,
                char_id: char._id,
                round_time: Number(seconds),
            }
    
            const response = await axios
                .put('/api/time', update);
        
            console.log(response.data);
    
            await fetchRounds();
    
        } else {
            console.log("Cannot update round time when not enough info present");
        }
      }

    return (

        <td><span><Timer onSubmit={handleUpdateTime} char={char}></Timer></span></td>

    )

}

export default PlayerTimeRow;