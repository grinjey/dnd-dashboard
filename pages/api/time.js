const { connectToDatabase } = require('../../utils/mongodb');

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        // case 'GET': {
        //     return getRounds(req, res);
        // }

        case 'PUT': {
            return updateRoundTime(req, res);
        }

        // case 'POST': {
        //     return addRound(req, res);
        // }

        // case 'DELETE': {
        //     return deleteChar(req, res);
        // }
    }
};

const updateRoundTime = async (req, res) => {

    try {
        // connect to the database
        let { db } = await connectToDatabase();

        if (req.body.round_id !== undefined && req.body.fight_id !== undefined && req.body.char_id !== undefined && req.body.round_time !== undefined) {
    
            await db.collection('rounds').updateOne(
                {
                    char_id: req.body.char_id,
                    fight_id: req.body.fight_id,
                    round_id: req.body.round_id
                },
                { $set: {round_time: req.body.round_time} }
            );
    
            return res.json({
                data: 'Round time updated successfully',
                success: true,
            });
        } else {
            return res.json({
                data: 'Round time not updated: Missing info',
                success: false,
            });
        }
        
    } catch (error) {

        // return an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }

}