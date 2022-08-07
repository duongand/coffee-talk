import * as pg from 'pg';
const { Pool } = pg.default

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'admin',
  database: 'postgres'
});

export function getAllDatabaseUsers() {
  return pool.query(`SELECT * FROM USERS`)
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(errors);
      return [];
    });
};

export function getDatabaseUsers(username) {
  return pool.query(`SELECT * FROM USERS WHERE username = $1`, [username])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};