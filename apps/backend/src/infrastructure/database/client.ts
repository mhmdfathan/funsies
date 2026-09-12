import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: false
}
});

export async function checkDatabaseConnection() {
  await db.execute(sql`SELECT 1`);
  console.log("Database Connected");
}
