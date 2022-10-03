const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;

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

        // case 'DELETE': {
        //     return deleteChar(req, res);
        // }
    }
};

async function getFights(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let rounds = await db
            .collection('fights')
            .find({})
            .toArray();
        // return the posts
        return res.json({
            data: JSON.parse(JSON.stringify(rounds)),
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
        console.log(req.body);
        await db.collection('fights').update(req.body, {$setOnInsert: {fight_name: req.body.fight_name}}, {upsert: true});
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
}