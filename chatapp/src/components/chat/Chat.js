import React, { useEffect, useState } from "react";
import { user } from "../chatLogin/ChatLogin";
import socketIo from "socket.io-client";
import sendbutton from "../../images/send.png";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import close from "../../images/close.png";
import "./chat.css";

const ENDPOINT = "http://localhost:4200/";
let socket;
const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessage] = useState([]);
  console.log(messages, id);
  const send = () => {
    const message = document.getElementById("chatinput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatinput").value = "";
  };
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatpage">
      <div className="chatcontainer">
        <div className="header">
          <h2>Statiq Chat</h2>
          <a href="/">
            <img src={close} />
          </a>
        </div>
        <ReactScrollToBottom className="chatbox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputbox">
          <input type="text" id="chatinput"></input>
          <button onClick={send} className="sendBtn">
            <img src={sendbutton} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
