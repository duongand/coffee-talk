import * as pg from 'pg';
const { Pool } = pg.default

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'wodebaobei',
  database: 'postgres'
});

export function getAllDatabaseUsers() {
  return pool.query(`SELECT * FROM USERS`)
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export function getDatabaseUser(username) {
  return pool.query(`SELECT * FROM USERS WHERE username = $1`, [username])
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export async function createDatabaseUser(username, hashPassword) {
  const lastUser = await getLastCreatedUser();
  const lastUserId = lastUser[0].user_id;
  pool.query('INSERT INTO users(user_id, username, password) VALUES($1, $2, $3)', 
    [lastUserId + 1, username, hashPassword])
    .then((response) => {
      console.log(response.rows);
    })
    .catch((error) => {
      console.log(error);
    });
};

function getLastCreatedUser() {
  return pool.query('SELECT * FROM USERS ORDER BY user_id DESC LIMIT 1')
    .then((response) => {
      // console.log(response.rows);
      return response.rows;
    }).catch((error) => {
      console.log(error);
      return [];
    });
};