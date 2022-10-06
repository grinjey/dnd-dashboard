const { connectToDatabase } = require('../../utils/mongodb');
const { fetchAllInits } = require('../../utils/db-requests/init-requests');

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getInitiatives(req, res);
        }

        // case 'PUT': {
        //     return updateRound(req, res);
        // }

        case 'POST': {
            return updateInitiative(req, res);
        }

        // case 'DELETE': {
        //     return deleteRound(req, res);
        // }
    }
};

async function getInitiatives(req,res){
    try {
        
        let initiatives = await fetchAllInits();

        // return the posts
        return res.json({
            data: JSON.parse(JSON.stringify(initiatives)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};

async function updateInitiative(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        if (req.body.fight_id !== undefined && req.body.round_id !== 0) {
            await db.collection('initiative').updateOne(
                {fight_id: req.body.fight_id, char_id: req.body.char_id},
                { $set:  {initiative: req.body.initiative}},
                {upsert: true}
            );
    
            return res.json({
                data: 'Initiative updated successfully',
                success: true,
            });
        } else {
            return res.json({
                data: `Cannot update round initiative without proper Fight_id: ${req.body.fight_id} and Round_id: ${req.body.round_id}`,
                success: true,
            });
        }

    } catch (error) {

        // return an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
};
