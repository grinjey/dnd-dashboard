import {useState, useEffect, useCallback} from "react";
import Table from "react-bootstrap/Table";

export const PlayerStatTable = ({chars, rounds}) => {

    const [charDprs, setCharDprs] = useState({})

    useEffect(() => {
        let dprs = buildDprs();
        setCharDprs(dprs);
    }, [chars, rounds]
    )

    const buildDprs = () => {

        let roundsByChars = chars.map(char => {
            return {char: char.name, charRounds: rounds.filter(function(round) {return round.char_id === char._id;})}
        })

        return roundsByChars.map(roundsByChar => {
            let totalDamageOutput = 0;
            let totalDamageTaken = 0;
            let totalTime = []; 
            let totalRounds = roundsByChar.charRounds.length;
            roundsByChar.charRounds.map(charRound => {
                totalDamageOutput += eval(charRound.damage_output);
                totalDamageTaken += eval(charRound.damage_taken);
                if (charRound.round_time) {
                    totalTime.push(eval(charRound.round_time));
                }
                
            })
            
            let damageOutputPerRound = totalDamageOutput / totalRounds;
            let damageTakenPerRound = totalDamageTaken / totalRounds;
            let timePerRound;
            if (totalTime.length > 0) {
                timePerRound = totalTime.reduce((a, b) => a + b) / totalTime.length;
            } else {
                timePerRound = 0;
            }

            return {name: roundsByChar.char, dopr: damageOutputPerRound, dtpr: damageTakenPerRound, tpr: timePerRound};

        })
        
    };



    return (

        <Table hover className="align-items-center text-center">
            <thead>
                <tr>
                    <th className="border-bottom text-secondary">Name</th>
                    <th className="border-bottom text-secondary">Damage Out/Round</th>
                    <th className="border-bottom text-secondary">Damage Taken/Round</th>
                    <th className="border-bottom text-secondary">Time/Round</th>
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
    )
}