import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const authRouter = new express.Router();

import {
  getDatabaseUser,
} from './database.js';

authRouter.post('/login', async (req, res) => {
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
        user_id: null,
        token: null
      });
      return;
    };

    console.log('Valid crendentials!');
    const token = jwt.sign({ userId: databaseUser.userId },
      'bonnie and clyde',
      { expiresIn: 3600 }
    );
    res.json({
      success: true,
      err: null,
      user_id: databaseUser.user_id,
      token: token
    });
  });
});