const { connectToDatabase } = require('../../utils/mongodb');

export const fetchAllChars = async () => {
    let { db } = await connectToDatabase();

    // fetch the posts
    let chars = await db
        .collection('chars')
        .find({})
        .toArray();

    return chars;
};