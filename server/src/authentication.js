import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const authRouter = new express.Router();

import {
  getAllDatabaseUsers,
  getDatabaseUser,
  createDatabaseUser
} from './database.js';

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const databaseUser = await getDatabaseUser(username);

  if (!databaseUser) {
    res.send([]);
  };

  bcrypt.compare(password, databaseUser.password, (error, result) => {
    if (result) {
      console.log('Valid crendentials!');
      const token = jwt.sign({ username: databaseUser.username }, 
        'bonnie and clyde',
        { expiresIn: 3600 }
      );
      res.json({
				success: true,
				err: null,
				token
			});
    } else {
			console.log('Invalid username and password credentials!');
			res.sendStatus(401).json({
				sucess: false,
				err: 'Entered password and hash do not match!',
				token: null,
			});
		};
  });
});

authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
	const databaseUser = await getDatabaseUser(username);

	if (databaseUser) {
		res.sendStatus(401).json({
			sucess: false,
			err: 'User already created.'
		});
	};

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    createDatabaseUser(username, hash);
		console.log('User created!');
		res.status(200).json({
			success: true,
			err: null
		});
  });
});