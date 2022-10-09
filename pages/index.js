import { PlayerDashboard } from "../components/dashboard/player-dashboard.js";
import { fetchAllChars } from "../utils/db-requests/char-requests";
import { fetchAllFights } from "../utils/db-requests/fight-requests";
import { fetchAllRounds } from "../utils/db-requests/round-requests";
import { fetchAllInits } from "../utils/db-requests/init-requests.js";
import Head from "next/head.js";
import Script from "next/script.js";
import { Container } from "react-bootstrap";



export async function getServerSideProps(context) {

    let chars;
    let rounds;
    let fights;
    let initiatives;

    try {
        chars = await fetchAllChars();
        rounds = await fetchAllRounds();
        fights = await fetchAllFights();
        initiatives = await fetchAllInits();
    } 
    catch (error) {
        console.log("There was an error loading server side props: ", error);
    }

    // fetch the chars
    if (chars, rounds, fights, initiatives) {
        let loadedChars = JSON.parse(JSON.stringify(chars));
        let loadedRounds = JSON.parse(JSON.stringify(rounds));
        let loadedFights = JSON.parse(JSON.stringify(fights));
        let loadedInitiatives = JSON.parse(JSON.stringify(initiatives));

        return {
            props: {loadedChars: loadedChars, loadedRounds: loadedRounds, loadedFights: loadedFights, loadedInitiatives: loadedInitiatives}, // will be passed to the page component as props
          }
    } else {
        return {
            notFound: true,
        }
    } 
};


export default function App({loadedChars, loadedRounds, loadedFights, loadedInitiatives}) {

    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        </Head>

        <Container className="bg-secondary min-vh-100" fluid>

        <div className="text-black text-center pr-3 pt-1">
            <h4>Character List</h4>
        </div>
        
        <PlayerDashboard loadedChars={loadedChars} loadedRounds={loadedRounds} loadedFights={loadedFights} loadedInitiatives={loadedInitiatives}/>

        </Container>
        
        </>

    );

};
