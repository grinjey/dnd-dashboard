const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        // case 'GET': {
        //     return getRounds(req, res);
        // }

        case 'POST': {
            return batchRoundAdd(req, res);
        }

        // case 'PUT': {
        //     return deleteChar(req, res);
        // }

        // case 'DELETE': {
        //     return deleteChar(req, res);
        // }
    }
};

async function batchRoundAdd(req, res) {

    try {
        let { db } = await connectToDatabase();

        const bulk = req.body.collection.map(document => {
            const inner = {
                "filter": { fight_id: document.fight_id, round_id: document.round_id, char_id: document.char_id },
                "update": { $setOnInsert : { fight_id: document.fight_id, round_id: document.round_id, char_id: document.char_id, damage_output: undefined, damage_taken: undefined}},
                "upsert" : true
            };
            const request = {updateOne: inner};
            return request;
            
        });

        const response = await db.collection('rounds').bulkWrite(bulk);

        return res.json({
            message: `Rounds ${req.body} added successfully`,
            success: true,
        });

    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }

    

}