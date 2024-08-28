import TransportStream from "winston-transport";
import { MongoClient, Db, Collection } from "mongodb";

interface MongoDBTransportOptions
  extends TransportStream.TransportStreamOptions {
  mongoUri: string;
  dbName?: string;
  collectionName?: string;
}

export class MongoDBTransport extends TransportStream {
  private client?: MongoClient;
  private db?: Db;
  private collection?: Collection;
  private collectionName: string;
  private dbName: string;
  private mongoUri: string;

  constructor(opts: MongoDBTransportOptions) {
    super(opts);
    this.collectionName = opts.collectionName || "logs";
    this.dbName = opts.dbName || "logs";
    this.mongoUri = opts.mongoUri;
  }

  private async connectToMongoDB(): Promise<void> {
    try {
      this.client = new MongoClient(this.mongoUri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
    }
  }

  async log(info: any, callback: () => void): Promise<void> {
    await this.connectToMongoDB();
    setImmediate(() => {
      this.emit("logged", info);
    });

    if (this.collection) {
      try {
        await this.collection.insertOne(info);
        callback();
      } catch (err) {
        console.error("Failed to insert log into MongoDB:", err);
        callback();
      } finally {
        await this.client?.close();
      }
    } else {
      console.error("MongoDB connection not established yet.");
      callback();
    }
  }
}
