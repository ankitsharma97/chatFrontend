// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigate from './components/Navigate';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';

import ChatView from './components/ChatView';

function App() {
  return (
    <Router>
      <Navigate />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/chat/:chatId" element={<ChatView />} />
      </Routes>
    </Router>
  );
}

export default App;
