import React, { useState } from "react";
import "../css/Chat.css";
import axios from "../axios";

import {
  SearchOutlined,
  MoreVert,
  AttachFile,
  Mic,
  InsertEmoticon,
} from "@material-ui/icons";

import { Avatar, IconButton } from "@material-ui/core";

function Chat({ messages }) {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message,
      name: "DEMO__NAME",
      timestamp: new Date(),
      recieved: false,
    });

    setMessage("");
  };
  const backgroundImage =
    "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__header__info">
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__header__right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div
        className="chat__body"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {messages.map(({ _id, message, name, timestamp, recieved }) => {
          console.log();
          return (
            <p
              className={`chat__message ${!recieved && "chat__reciever"}`}
              key={_id}
            >
              <span className="chat__name">{name}</span>
              {message}
              <span className="chat__timestamp">
                {new Date().toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
