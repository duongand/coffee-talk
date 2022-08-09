import axios from 'axios';

export function loginUser(loginForm) {
  const body = ({
    'username': loginForm.username,
    'password': loginForm.password
  });

  return axios.post('/login', 
    body
  ).then((response) => {
    setToken(response.data.token);
    return response.data;
  });
};

export function registerUser(registerForm) {
  const body = ({
    'username': registerForm.username,
    'password': registerForm.password
  });

  return axios.post('/api/users', 
    body
  ).then((response) => {
    return response.data;
  });
};

function setToken(token) {
  localStorage.setItem('token', token);
};