const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
const { fetchAllRounds } = require("../../utils/db-requests/round-requests")

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getRounds(req, res);
        }

        case 'PUT': {
            return updateRound(req, res);
        }

        case 'POST': {
            return addRound(req, res);
        }

        // case 'DELETE': {
        //     return deleteChar(req, res);
        // }
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
            await db.collection('rounds').update(req.body, {$setOnInsert: 
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
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts

        // const round_id = Number(req.query.round_id)

        // const query = [
        //     {fight_id: req.query.fight_id},
        //     {round_id: round_id}
        // ];

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
        
        let set;

        if (req.body.round_id !== undefined && req.body.fight_id !== undefined && req.body.char_id !== undefined) {
            if (req.body.damage_taken == undefined) {
                set = {damage_output: req.body.damage_output};
            } else {
                set = {damage_taken: req.body.damage_taken}
            }
    
            await db.collection('rounds').updateOne(
                {
                    char_id: req.body.char_id,
                    fight_id: req.body.fight_id,
                    round_id: req.body.round_id
                },
                { $set: set }
            );
    
            return res.json({
                data: 'Round updated successfully',
                success: true,
            });
        } else {
            return res.json({
                data: 'Round not updated: Missing info',
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