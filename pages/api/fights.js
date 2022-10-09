const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
const { fetchAllFights } = require("../../utils/db-requests/fight-requests")

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getFights(req, res);
        }

        case 'POST': {
            return addFight(req, res);
        }

        case 'PUT': {
            return updateFight(req, res);
        }

        case 'DELETE': {
            return deleteFight(req, res);
        }
    }
};

async function getFights(req,res){
    try {
        
        let fights = await fetchAllFights();

        // return the posts
        return res.json({
            data: JSON.parse(JSON.stringify(fights)),
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

async function addFight(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        await db.collection('fights').updateOne(req.body, {$setOnInsert: {fight_name: req.body.fight_name}}, {upsert: true});
        // return a message
        return res.json({
            data: `Char ${req.body} added successfully`,
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
};

async function updateFight(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        // update the published status of the post
        await db.collection('fights').updateOne(
            {
                _id: new ObjectId(req.body._id),
            },
            { $set: { rounds: req.body.rounds } }
        );

        // return a message
        return res.json({
            data: `Fight ${req.body._id} updated successfully`,
            success: true,
        });
    } catch (error) {

        // return an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
};

async function deleteFight(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the char
        await db.collection('fights').deleteOne({
            _id: new ObjectId(req.body._id)
        });


        // Deleting the char rounds
        await db.collection('rounds').deleteMany(
            {fight_id: req.body._id}
        );

        // Deleting the char initiatives
        await db.collection('initiative').deleteMany(
            {fight_id: req.body._id}
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