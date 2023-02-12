import React from "react";
import "./msg.css";
const Message = ({ user, message, classs }) => {
  return user ? (
    <div className={`msgBox ${classs}`}>{`${user}: ${message}`}</div>
  ) : (
    <div className={`msgBox ${classs}`}>{`You: ${message}`}</div>
  );
};

export default Message;
