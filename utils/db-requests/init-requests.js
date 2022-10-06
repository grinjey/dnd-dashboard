const { connectToDatabase } = require('../../utils/mongodb');

export const fetchAllInits = async () => {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let initiatives = await db
        .collection('initiative')
        .find({})
        .toArray();

    return initiatives;
};