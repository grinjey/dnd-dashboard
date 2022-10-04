import { Container } from "react-bootstrap";
import { PlayerDashboard } from "../components/dashboard/player-dashboard.js";
import { fetchAllChars } from "../utils/db-requests/char-requests.js";
import { fetchAllRounds } from "../utils/db-requests/round-requests.js";

export async function getServerSideProps(context) {

    let chars;
    let rounds;

    try {
        chars = await fetchAllChars();
        rounds = await fetchAllRounds();
    } 
    catch (error) {
        console.log("There was an error loading server side props: ", error);
    }

    // fetch the chars
    if (chars, rounds) {
        let loadedChars = JSON.parse(JSON.stringify(chars));
        let loadedRounds = JSON.parse(JSON.stringify(rounds));
        return {
            props: {loadedChars: loadedChars, loadedRounds: loadedRounds}, // will be passed to the page component as props
          }
    } else {
        return {
            notFound: true,
        }
    } 
};


export default function App({ loadedChars, loadedRounds }) {

    return (
        <div style={{backgroundColor : 'black', height : "150vh"}}>
        <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="mb-4 mb-lg-0 ps-5">
                <h4 className="text-white">Character List</h4>
                <p className="mb-0 text-white-50">Your DnD characters.</p>
            </div>
        </div>

        <div className="d-flex justify-content-center">
            <PlayerDashboard loadedChars={loadedChars} loadedRounds={loadedRounds}/>
        </div>
        
        
        
        
        </div>
    );

};
