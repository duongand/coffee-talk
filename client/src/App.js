import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [token, setToken] = useState(null);

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
        console.log('successful login');
        setToken(response.token);
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
              users={[]}
              messages={[]}
              handleMessageDraftChange={handleMessageDraftChange}
              messageDraft={messageDraft}
              sendMessage={sendMessage}
            />
          } />
      </Routes>
    </div>
  );
}

export default App;
