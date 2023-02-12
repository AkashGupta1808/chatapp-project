import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import ChatLogin from "./components/chatLogin/ChatLogin";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLogin />} />
        <Route path="/chat"  element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App;
