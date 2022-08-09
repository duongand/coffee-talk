import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { expressjwt } from 'express-jwt';

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
app.use('/api', apiRouter);
app.use(authRouter);
app.use(express.json());

app.get('/', jwtMW, (req, res) => {
  console.log('Web token checked');
  res.send('You are authenticated');
});

app.get('/*', async(req, res) => {
  res.sendFile('index.html', { root: buildPath });
});

server.listen(port, () => {
  console.log(`coffee-talk listening on port ${port}`);
});

io.on('connection', (socket) => {
  console.log('Made socket connection');
});