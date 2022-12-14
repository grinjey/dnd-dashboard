const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
const { fetchAllRounds } = require("../../utils/db-requests/round-requests")

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getRounds(req, res);
        }

        // case 'PUT': {
        //     return updateRound(req, res);
        // }

        case 'POST': {
            return updateRound(req, res);
        }

        case 'DELETE': {
            return deleteRound(req, res);
        }
    }
};

async function addRound(req, res) {
    try {

        if (req.body.char_id !== undefined 
            && req.body.fight_id !== undefined 
            && req.body.round_id !== undefined 
            && req.body.damage_output !== undefined
            && req.body.damage_taken !== undefined) {

            // connect to the database
            let { db } = await connectToDatabase();
            // add the post
            // await db.collection('chars').insertOne(req.body);
            await db.collection('rounds').updateOne(req.body, {$setOnInsert: 
                {
                char_id: req.body.char_id,
                fight_id: req.body.fight_id,
                round_id: req.body.round_id,
                damage_output: req.body.damage_output,
                damage_taken: req.body.damage_taken
                }
            }, {upsert: true});

            // return a message
            return res.json({
                data: `Round ${req.body} added successfully`,
                success: true,
            });
        } else {
            return res.json({
                data: `Round ${req.body} not added: Missing Info`,
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
};

async function getRounds(req,res){
    try {

        let rounds = await fetchAllRounds();

        // return the posts
        return res.json({
            data: JSON.parse(JSON.stringify(rounds)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
};

async function updateRound(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        if (req.body.fight_id !== undefined && req.body.round_id !== 0) {
            await db.collection('rounds').updateOne(
                {fight_id: req.body.fight_id, round_id: req.body.round_id, char_id: req.body.char_id},
                { $set:  {damage_output: req.body.damage_output, damage_taken: req.body.damage_taken}},
                {upsert: true}
            );
    
            return res.json({
                data: 'Round updated successfully',
                success: true,
            });
        } else {
            return res.json({
                data: `Cannot update round without proper Fight_id: ${req.body.fight_id} and Round_id: ${req.body.round_id}`,
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

const deleteRound = async (req, res) => {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        const new_rounds = req.body.round_id - 1;

        if (new_rounds < 0) {
            return res.json({
                data: `Cannot delete round for fight: ${req.body.fight_id} No rounds to delete.`,
                success: true,
            });
        }

        // Deleting the char
        await db.collection('rounds').deleteMany({
            fight_id: req.body.fight_id,
            round_id: req.body.round_id
        });


        // Deleting the char rounds
        await db.collection('fights').updateOne(
            {_id: new ObjectId(req.body.fight_id)},
            { $set: {rounds : new_rounds} }
        );

        // // returning a message
        return res.json({
            data: `Fight ${req.body.fight_name} deleted successfully`,
            success: true,
        });
    } catch (error) {

        // returning an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}