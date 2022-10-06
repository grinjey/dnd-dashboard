const { connectToDatabase } = require('../../utils/mongodb');

export const fetchAllFights = async () => {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let fights = await db
        .collection('fights')
        .find({})
        .toArray();

    return fights;
};