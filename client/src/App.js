import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Chat from './routes/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  loginUser
} from './authHelpers.js'

import loggedUsers from './data/loggedUsers';
import chatMessages from './data/chatMessages';

function App() {
  const [loginForm, setLoginForm] = useState({
    'username': '',
    'password': ''
  });
  const [registerForm, setRegisterForm] = useState({
    'username': '',
    'password': '',
    'confirmPassword': ''
  });
  const [id, setId] = useState(null);

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value
    }));
  };

  function handleRegisterChange(event) {
    const { name, value } = event.target;
    setRegisterForm((prevRegisterForm) => ({
      ...prevRegisterForm,
      [name]: value
    }));
  };

  function onSubmit(event) {
    event.preventDefault();
    const formType = event.target.className;
    if (formType === 'login-form') {
      const token = loginUser(loginForm);
      console.log(token);
    } else if (formType === 'register-form') {
      console.log('register form');
    };
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          } />
        <Route
          path="/login"
          element={
            <Login
              loginForm={loginForm}
              handleLoginChange={handleLoginChange}
              registerForm={registerForm}
              handleRegisterChange={handleRegisterChange}
              onSubmit={onSubmit}
            />
          } />
        <Route
          path="/chat"
          element={
            <Chat
              users={loggedUsers}
              messages={chatMessages}
            />
          } />
      </Routes>
    </div>
  );
}

export default App;
