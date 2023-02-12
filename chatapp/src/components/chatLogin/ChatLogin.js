import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./chatlogin.css";

let user;

const sendUser = () => {
  user = document.getElementById("textinput").value;
  document.getElementById("textinput").value = "";
};

const ChatLogin = () => {
  const [name, setName] = useState("");
  return (
    <div className="mainPage">
      <div className="container">
        <img src={logo} alt="logo" />
        <h1>Statiq Chat</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          id="textinput"
        />
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat"
        >
          <button className="button-17" onClick={sendUser}>
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatLogin;
export { user };
