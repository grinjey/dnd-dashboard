import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://seth:1234@dnd-dashboard.mqqctgu.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB = "dnd-dashboard";

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let db = null;


export async function connectToDatabase() {
    try {
        if (mongoClient && db) {
            return { mongoClient, db };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(MONGODB_URI, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(MONGODB_URI, options)).connect();
        }
        db = await mongoClient.db(MONGODB_DB);
        return { mongoClient, db };
    } catch (e) {
        console.error(e);
    }
}