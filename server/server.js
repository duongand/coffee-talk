import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { expressjwt } from 'express-jwt';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { apiRouter } from './src/routes.js';
import { authRouter } from './src/authentication.js';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'client', 'build');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

const jwtMW = expressjwt({
  secret: process.env.JWTSECRET,
  algorithms: ['HS256']
});

app.use(express.static(buildPath));
app.use(express.json());
app.use('/api', apiRouter);
app.use(authRouter);

app.get('/', jwtMW, (req, res) => {
  console.log('Web token checked');
  res.send('You are authenticated');
});

app.get('/*', async (req, res) => {
  res.sendFile('index.html', { root: buildPath });
});

server.listen(port, () => {
  console.log(`coffee-talk listening on port ${port}`);
});

const activeUsers = new Set();
io.on('connection', (socket) => {
  console.log('Made socket connection');

  socket.on('user login', async (token, callback) => {
    console.log('New user added');
    const userId = jwtDecode(token).userId;
    const username = (await axios.get(`http://localhost:3000/api/users/${userId}`)).data.username;
    const messages = (await axios.get('http://localhost:3000/api/messages')).data;
    activeUsers.add(username);
    callback({
      'activeUsers': [...activeUsers],
      'messages': messages
    });
  });

  socket.on('saved messages', async (callback) => {
    const messages = (await axios.get('http://localhost:3000/api/messages')).data;
    callback(messages);
  });

  socket.on('active users', async (callback) => {
    callback([...activeUsers]);
  });

  socket.on('disconnect', async (token, callback) => {
    console.log('New user added');
    const userId = jwtDecode(token).userId;
    const username = (await axios.get(`http://localhost:3000/api/users/${userId}`)).data.username;
    activeUsers.remove(username);
  });
});