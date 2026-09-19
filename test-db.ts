import * as dotenv from 'dotenv';
import { resolve } from 'path';
import postgres from 'postgres';

dotenv.config({ path: resolve(process.cwd(), '.dev.vars') });

async function testConnection() {
  const url = process.env.DATABASE_URL;
  console.log('Connecting to:', url ? url.substring(0, 30) + '...' : 'undefined');
  
  if (!url) {
    console.error('No DATABASE_URL set');
    process.exit(1);
  }

  try {
    const sql = postgres(url, { max: 1 });
    const result = await sql`SELECT 1 as connected`;
    console.log('Connection successful!', result);
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
}

testConnection();
