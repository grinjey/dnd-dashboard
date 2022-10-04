const { connectToDatabase } = require('../../utils/mongodb');

export const fetchAllRounds = async () => {
    let { db } = await connectToDatabase();

    // fetch the posts
    let rounds = await db
        .collection('rounds')
        .find({})
        .toArray();

    return rounds;
}