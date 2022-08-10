import express from 'express';
import bcrypt from 'bcrypt';
import jwtDecode from 'jwt-decode';
export const apiRouter = new express.Router();

import {
  getAllMessages,
  createMessage,
  createDatabaseUser,
  getAllDatabaseUsers,
  getDatabaseUser,
  getDatabaseUserById
} from './database.js';

apiRouter.get('/messages', async (req, res) => {
  res.send(await getAllMessages());
});

apiRouter.post('/messages', (req, res) => {
  const { message, token } = req.body;
  const userId = jwtDecode(token).userId;
  createMessage(message, userId);
  res.sendStatus(200)
});

apiRouter.get('/users', async (req, res) => {
  res.send(await getAllDatabaseUsers());
});

apiRouter.post('/users', async (req, res) => {
  const { username, password } = req.body;
  const databaseUser = await getDatabaseUser(username);
  if (databaseUser) {
    res.status(401).json({
      sucess: false,
      err: 'User already created.'
    });
    return;
  };

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    createDatabaseUser(username, hash);
    res.status(200).json({
      success: true,
      err: null
    });
  });
});

apiRouter.get(`/users/:id`, async (req, res) => {
  res.send(await getDatabaseUserById(req.params.id));
});