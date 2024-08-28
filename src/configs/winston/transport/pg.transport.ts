import TransportStream from "winston-transport";
import { Pool } from "pg";

interface PostgresTransportOptions
  extends TransportStream.TransportStreamOptions {
  connectionString: string;
  tableName?: string;
}

export class PostgresTransport extends TransportStream {
  private pool: Pool;
  private tableName: string;

  constructor(opts: PostgresTransportOptions) {
    super(opts);

    this.tableName = opts.tableName || "logs";

    this.pool = new Pool({
      connectionString: opts.connectionString,
    });

    this.createTableIfNotExists();
  }

  private async createTableIfNotExists(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id SERIAL PRIMARY KEY,
        level VARCHAR(255),
        message TEXT,
        meta JSONB,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await this.pool.query(query);
      console.log(`Table "${this.tableName}" is ready.`);
    } catch (err) {
      console.error("Error creating table:", err);
    }
  }

  async log(info: any, callback: () => void): Promise<void> {
    setImmediate(() => {
      this.emit("logged", info);
    });

    const query = `
      INSERT INTO ${this.tableName} (level, message, meta)
      VALUES ($1, $2, $3);
    `;
    const values = [info.level, info.message, info.meta || {}];

    try {
      await this.pool.query(query, values);
      callback();
    } catch (err) {
      console.error("Failed to insert log into PostgreSQL:", err);
      callback();
    }
  }
}
