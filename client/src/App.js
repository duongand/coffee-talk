import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import Home from './routes/Home';
import Login from './routes/Login';
import Chat from './routes/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  loginUser,
  registerUser
} from './clientAuth.js'

import {
  createMessage
} from './helpers.js';

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
  const [messageDraft, setMessageDraft] = useState({
    'message': ''
  });
  const [activeUsers, setActiveUsers] = useState([]);
  const [messageLog, setMessageLog] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    socket.current = io();
    socket.current.emit('user login', localStorage.getItem('token'), (response) => {
      setActiveUsers(response.activeUsers);
      setMessageLog(response.messages);
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    socket.current.emit('saved messages', (messages) => {
      setMessageLog(messages)
    });

    socket.current.emit('active users', (users) => {
      setActiveUsers(users);
    });
  })

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

  function handleMessageDraftChange(event) {
    const { name, value } = event.target;
    setMessageDraft((prevMessageDraft) => ({
      ...prevMessageDraft,
      [name]: value
    }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    const formType = event.target.className;
    if (formType === 'login-form') {
      const response = await loginUser(loginForm);

      if (response.success) {
				window.location.href = 'http://localhost:3000/chat';
      };
    } else if (formType === 'register-form') {
      if (registerForm.password !== registerForm.confirmPassword) {
        return;
      };
      
      const response = await registerUser(registerForm);
      if (response.success) {
				window.location.href = 'http://localhost:3000/login';
      };
    };
  };

  function sendMessage(event) {
    event.preventDefault();
    createMessage(messageDraft.message);
    setMessageDraft({
      'message': ''
    });
  };

  function logout(event) {
    console.log('logged out');
    event.preventDefault();
    localStorage.clear();
    setActiveUsers([]);
    setMessageLog([]);
    socket.current = null;
    window.location.href = '/';
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
              users={activeUsers}
              messages={messageLog}
              handleMessageDraftChange={handleMessageDraftChange}
              messageDraft={messageDraft}
              sendMessage={sendMessage}
              logout={logout}
            />
          } />
      </Routes>
    </div>
  );
}

export default App;
