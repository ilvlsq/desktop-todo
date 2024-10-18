import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CERTIFICATE,
  },
};

const pool = new Pool(config);

async function setupDatabase() {
  const sql = fs.readFileSync(path.join(__dirname, './init.sql')).toString();
  try {
    await pool.query(sql);
    console.log('Tables successfully created');
  } catch (err) {
    console.error('Error during table creation:', err);
  } finally {
    await pool.end();
  }
}

setupDatabase();
