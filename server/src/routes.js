import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
  const response = createMessage(message, userId);
	
	if (response) {
		res.send(response);
		return;
	};
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
    if (err) {
      res.status(401).json({
        success: false,
        err: err
      });
    };

    createDatabaseUser(username, hash);
    res.status(200).json({
      success: true,
      err: null
    }); 
  });
});

apiRouter.get('/users/:id', async (req, res) => {
  res.send(await getDatabaseUserById(req.params.userId));
});

apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const databaseUser = await getDatabaseUser(username);
  if (!databaseUser || !username || !password) {
    res.send([]);
    return;
  };

  bcrypt.compare(password, databaseUser.password, (error, result) => {
    if (!result) {
      console.log('Invalid username and password credentials!');
      res.status(401).json({
        sucess: false,
        err: error,
        username: null,
        token: null
      });
      return;
    };

    console.log('Valid crendentials!');
    const token = jwt.sign(
      { userId: databaseUser.userId, username: databaseUser.username },
      process.env.JWTSECRET,
      { expiresIn: 3600 }
    );
    res.status(200).json({
      success: true,
      err: null,
      username: databaseUser.username,
      token: token
    });
  });
});