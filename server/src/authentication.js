import express from 'express';
export const authRouter = new express.Router();

import {
  getAllDatabaseUsers,
  getDatabaseUsers
} from './database.js';

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const databaseUsers = await getDatabaseUsers(username);
  console.log(databaseUsers);

  res.sendStatus(200);
});