// This script resets the database tables for the custom items app
import { pool } from './database.js';

async function resetTables() {
  try {
    // Drop the tables if they exist
    await pool.query('DROP TABLE IF EXISTS customitems');
    await pool.query('DROP TABLE IF EXISTS cars');
    // Create the cars table with new columns
    await pool.query(`
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        make VARCHAR(100),
        model VARCHAR(100),
        color VARCHAR(50),
        price NUMERIC,
        roof VARCHAR(50),
        wheels VARCHAR(50),
        exterior VARCHAR(50),
        interior VARCHAR(50),
        convertible BOOLEAN,
        features JSONB
      )
    `);
    // Create the customitems table
    await pool.query(`
      CREATE TABLE customitems (
        id SERIAL PRIMARY KEY,
        itemname VARCHAR(100),
        image TEXT,
        catagory VARCHAR(50),
        price NUMERIC
      )
    `);
    console.log('Table reset successfully!');
  } catch (err) {
    console.error('Error resetting tables:', err);
  } finally {
    await pool.end();
  }
}

resetTables();
