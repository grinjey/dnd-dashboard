import {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import FilterStatsDropdown from "../dropdown/filter-stats-dropdown";

export const PlayerStatTable = ({chars, rounds, fights}) => {

    const [charDprs, setCharDprs] = useState({})
    const [filter, setFilter] = useState("All");
    const [roundsToUse, setRoundsToUse] = useState(rounds);
    const [selectedFight, setSelectedFight] = useState(null);


    useEffect(() => {

        const refreshRoundsToUse = () => {

            if (selectedFight === null) {
                setRoundsToUse(rounds);
            } else if (selectedFight._id !== undefined) {
                let filterRounds = rounds.filter(function(round) {return round.fight_id === selectedFight._id;})
                setRoundsToUse(filterRounds);
            }

        }

        refreshRoundsToUse();


    }, [chars, rounds, fights, selectedFight]
    )

    useEffect(() => {
        let dprs = buildDprs();
        setCharDprs(dprs);
    }, [roundsToUse]
    )

    const buildDprs = () => {

        console.log("Building stats")

        

        let roundsByChars = chars.map(char => {
            let charRounds = roundsToUse.filter(function(round) {return round.char_id === char._id;})
            return {char: char.name, charRounds: charRounds}
        })

        return roundsByChars.map(roundsByChar => {
            let totalDamageOutput = [];
            let totalDamageTaken = [];
            let totalTime = [];

            roundsByChar.charRounds.map(charRound => {
                if (charRound.damage_output !== undefined) {
                    totalDamageOutput.push(eval(charRound.damage_output));
                }
                
                if (charRound.damage_taken !== undefined) {
                    totalDamageTaken.push(eval(charRound.damage_taken));
                }

                if (charRound.round_time !== undefined) {
                    totalTime.push(eval(charRound.round_time));
                }
            })
            
            let damageOutputPerRoundTrunc;
            let damageTakenPerRoundTrunc;
            let timePerRoundTrunc;
            let sumTotalTime;

            if (totalDamageOutput.length > 0) {
                let damageOutputPerRound = totalDamageOutput.reduce((a, b) => a + b) / totalDamageOutput.length
                damageOutputPerRoundTrunc = Number(damageOutputPerRound).toFixed(2)
            } else {
                damageOutputPerRoundTrunc = 0;
            }

            if (totalDamageTaken.length > 0) {
                let damageTakenPerRound = totalDamageTaken.reduce((a, b) => a + b) / totalDamageTaken.length
                damageTakenPerRoundTrunc = Number(damageTakenPerRound).toFixed(2)
            } else {
                damageTakenPerRoundTrunc = 0;
            }

            if (totalTime.length > 0) {
                sumTotalTime = totalTime.reduce((a, b) => a + b)
                let timePerRound =  sumTotalTime / totalTime.length
                timePerRoundTrunc = Number(timePerRound).toFixed(2)
            } else {
                timePerRoundTrunc = 0;
                sumTotalTime = 0;
            }

            return {name: roundsByChar.char, dopr: damageOutputPerRoundTrunc, dtpr: damageTakenPerRoundTrunc, tpr: timePerRoundTrunc, stt: sumTotalTime};

        })
        
    };

    const selectFilter = (event) => {
        if ( event === "0" ) {
            setFilter("All");
            // setRoundsToUse(rounds);
            setSelectedFight(null);
        } else {
            // let filterRounds = rounds.filter(function(round) {return round.fight_id === event;})
            // setRoundsToUse(filterRounds);

            let selectedFight = fights.find((item) => item._id === event);
            setFilter(selectedFight.fight_name);
            setSelectedFight(selectedFight);


        }
    };

    return (
        <Card border="" style={{backgroundColor : "#062206"}} className="d-flex table-wrapper table-responsive shadow-sm">
            <div className="text-center fw-bold px-3 py-2 border-bottom">
                <h5 className="text-white">Player Statistics</h5>
            </div>
            <div className="d-flex flex-row border-bottom px-2 py-2 justify-content-center align-center">
                <FilterStatsDropdown fights={fights} onSelect={selectFilter} title={filter}></FilterStatsDropdown>
            </div>
            <Card.Body>
            
            <Table hover className="align-items-center text-center">
                <thead>
                    <tr>
                        <th className="border-bottom text-secondary">Name</th>
                        <th className="border-bottom text-secondary">Damage Out/Round</th>
                        <th className="border-bottom text-secondary">Damage Taken/Round</th>
                        <th className="border-bottom text-secondary">Time/Round</th>
                        <th className="border-bottom text-secondary">Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    {charDprs.length > 0 ? (
                        charDprs.map((dpr) => (
                            <tr key={dpr.name} className='bg-secondary fw-bold text-black text-center'>
                                <td><span>{dpr.name}: </span></td>
                                <td><span>{dpr.dopr ? dpr.dopr : 0}</span></td>
                                <td><span>{dpr.dtpr ? dpr.dtpr : 0}</span></td>
                                <td><span>{dpr.tpr ? dpr.tpr : 0}s</span></td>
                                <td><span>{dpr.stt ? dpr.stt : 0}s</span></td>
                                
                            </tr>
                            )
                            )
                        ) : (
                            <tr className="table-row">
                                <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no Characters for statistics.</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        
    )
}