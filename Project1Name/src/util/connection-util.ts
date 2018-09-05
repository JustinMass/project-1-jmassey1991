import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: process.env["MOVIE_DB_USERNAME"],
  host: 'revature-1808.cxks8zic54ol.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: process.env["MOVIE_DB_PASSWORD"],
  port: 5432,
  max: 2
})
