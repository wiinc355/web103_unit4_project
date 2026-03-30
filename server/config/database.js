
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';



const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
};

// Debug log to check dotenv values (mask password)
console.log('[DB CONFIG]', {
    ...config,
    password: config.password ? String(config.password).slice(0, 3) + '***' : config.password
});

export const pool = new pg.Pool(config)
