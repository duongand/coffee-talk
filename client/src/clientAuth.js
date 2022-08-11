import axios from 'axios';

export function loginUser(loginForm) {
  const body = ({
    'username': loginForm.username,
    'password': loginForm.password
  });

  return axios.post('/api/login', 
    body
  ).then((response) => {
    if (response.status === 401) return;
    setToken(response.data.token);
    return response.data;
  }).catch((error) => {
    console.log(error);
    return 401;
  });
};

export function registerUser(registerForm) {
  if (!checkValidPassword(registerForm.password)) return 401;
  const body = ({
    'username': registerForm.username,
    'password': registerForm.password
  });

  return axios.post('/api/users', 
    body
  ).then((response) => {
    return response.status;
  }).catch((error) => {
    console.log(error);
    return 401;
  });
};

function setToken(token) {
  localStorage.setItem('token', token);
};

function checkValidPassword(password) {
  return password.length === 4 && Number.isInteger(parseInt(password));
};