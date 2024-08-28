import { MongoClient } from "mongodb";
import "dotenv/config";

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGODB_DB_NAME || "test";

export const connectMongo = async ({
  uri = URI,
  dbName = DB_NAME,
}: {
  uri?: string;
  dbName?: string;
}) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
  } catch (err) {
    throw new Error(`[connection to mongodb]: ${err}`);
  }
};

export const disconnectMongo = async (client: MongoClient) => {
  try {
    await client.close();
  } catch (err) {
    throw new Error(`[disconnection from mongodb]: ${err}`);
  }
};
