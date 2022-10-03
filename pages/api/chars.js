const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getChars(req, res);
        }

        case 'POST': {
            return addChar(req, res);
        }

        // case 'PUT': {
        //     return deleteChar(req, res);
        // }

        case 'DELETE': {
            return deleteChar(req, res);
        }
    }
}

async function getChars(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let chars = await db
            .collection('chars')
            .find({})
            .toArray();
        // return the posts
        return res.json({
            data: JSON.parse(JSON.stringify(chars)),
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

async function addChar(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        console.log(req.body);
        // add the post
        // await db.collection('chars').insertOne(req.body);
        await db.collection('chars').update(req.body, {$setOnInsert: {name: req.body.name, playerclass: req.body.playerclass}}, {upsert: true});
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

async function deleteChar(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the post
        await db.collection('chars').deleteOne({
            _id: new ObjectId(req.body._id)
        });

        // // returning a message
        return res.json({
            data: 'Char deleted successfully',
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