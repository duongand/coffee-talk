import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { expressjwt } from 'express-jwt';
import jwtDecode from 'jwt-decode';
import { apiRouter } from './src/routes.js';

import { 
	getAllMessages
} from './src/database.js';

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

const activeUsers = new Set();
io.on('connection', (socket) => {
  console.log('Made socket connection');

  socket.on('user joined', async (token) => {
    const { username } = jwtDecode(token);
    const messages = await getAllMessages();
    activeUsers.add(username);
		io.emit('new user', [...activeUsers]);
    io.emit('return message', messages); 
  });

  socket.on('user left', (token) => {
    console.log('A user has left');
    const { username } = jwtDecode(token);
    activeUsers.delete(username);
		io.emit('new user', [...activeUsers]);
  });

	socket.on('new message', async () => {
		console.log('New message was sent');
		const messages = await getAllMessages();
		io.emit('return message', messages);
	});
});

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