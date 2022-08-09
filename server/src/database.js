import * as pg from 'pg';
const { Pool } = pg.default;

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
  return pool.query('SELECT * FROM USERS WHERE "username" = $1', [username])
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export function getDatabaseUserById(id) {
  return pool.query('SELECT * FROM USERS WHERE "userId" = $1', [id])
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
  const lastUserId = (lastUser.length === 0 ? 0 : lastUser[0].userId);
  pool.query('INSERT INTO USERS("userId", "username", "password", "createDate") VALUES($1, $2, $3, $4)',
    [lastUserId + 1, username, hashPassword, getDate()])
    .then((response) => {
      console.log('User created!');
    })
    .catch((error) => {
      console.log(error);
    });
};

function getLastCreatedUser() {
  return pool.query('SELECT * FROM USERS ORDER BY "userId" DESC LIMIT 1')
    .then((response) => {
      return response.rows;
    }).catch((error) => {
      console.log(error);
      return [];
    });
};

export function getAllMessages() {
  return pool.query('SELECT * FROM MESSAGES')
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export async function createMessage(message, userId) {
  const lastMessage = await getLastCreatedMessage();
  console.log(lastMessage);
  const lastMessageId = (lastMessage.length === 0 ? 0 : lastMessage[0].messageId);
  return pool.query('INSERT INTO MESSAGES("messageId", "message", "userId", "createDate") VALUES ($1, $2, $3, $4)', 
    [lastMessageId + 1, message, userId, getDate()])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(error);
    });
};

function getLastCreatedMessage() {
  return pool.query('SELECT * FROM MESSAGES ORDER BY "messageId" DESC LIMIT 1')
    .then((response) => {
      return response.rows;
    }).catch((error) => {
      console.log(error);
      return [];
    });
};

function getDate() {
  const currentDate = new Date();
  return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`)
};