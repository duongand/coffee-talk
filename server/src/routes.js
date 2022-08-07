import express from 'express';
export const apiRouter =  new express.Router();

apiRouter.get('/messages', (req, res) => {
  // get messages when a user logs in
});

apiRouter.post('/messages', (req, res) => {
  // create a message
});

apiRouter.get('/users', (req, res) => {
  // get list of users to see if login request is valid pull id
});

apiRouter.post('/users', (req, res) => {
  // register a user
});

apiRouter.get(`/users/id`, (req, res) => {
  // get user information based on id
});