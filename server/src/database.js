import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';

let pool;
if (process.env.ENVIRONMENT === "PRODUCTION") {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
};

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
  pool.query('INSERT INTO USERS("userId", "username", "password") VALUES($1, $2, $3)',
    [lastUserId + 1, username, hashPassword])
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
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
  return pool.query('SELECT messages."messageId", messages.message, users.username, messages."createDate" FROM messages JOIN users ON users."userId" = messages."userId"')
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
  const lastMessageId = (lastMessage.length === 0 ? 0 : lastMessage[0].messageId);
  return pool.query('INSERT INTO MESSAGES("messageId", "message", "userId") VALUES ($1, $2, $3)',
    [lastMessageId + 1, message, userId])
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
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