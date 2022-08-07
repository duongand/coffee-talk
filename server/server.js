import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { expressjwt } from 'express-jwt';

import { apiRouter } from './src/routes.js';
import { authRouter } from './src/authentication.js';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);

const app = express();
const port = process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'client', 'build');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

const jwtMW = expressjwt({
  secret: 'bonnie and clyde',
  algorithms: ['HS256']
});

app.use(express.static(buildPath));
app.use('/api', apiRouter);
app.use(authRouter);

app.get('/', jwtMW, (req, res) => {
  console.log('Web token checked');
  res.send('You are authenticated');
});

app.get('/*', async(req, res) => {
  res.sendFile('index.html', { root: buildPath });
});

app.listen(port, () => {
  console.log(`coffee-talk listening on port ${port}`);
});