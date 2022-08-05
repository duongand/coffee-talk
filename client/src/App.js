import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Chat from './routes/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import loggedUsers from './data/loggedUsers';
import chatMessages from './data/chatMessages';

function App() {
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
            <Login />
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
