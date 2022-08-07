import decode from 'jwt-decode';
import axios from 'axios';

export function loginUser(loginForm) {
  const body = ({
    'username': loginForm.username,
    'password': loginForm.password
  });

  return axios.post('/login', 
    body
  ).then((response) => {
    // console.log(response);
    return response;
  });
};

function setToken(token) {
  localStorage.setItem('token', token);
};

function getToken() {
  return localStorage.getItem('token');
};

function logout() {
  localStorage.removeItem('token');
};