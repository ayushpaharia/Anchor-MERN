import React, { useEffect, useState } from "react";

// Layout
import Sidebar from "./layout/Sidebar";
import Chat from "./layout/Chat";
import { pusher_id } from "../config";
import axios from "./axios";
import "./css/App.css";

import Pusher from "pusher-js";

// Fetching all messages
function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  // Subscribing to Changes Realtime MongoDB
  useEffect(() => {
    const pusher = new Pusher(pusher_id, {
      cluster: "ap2",
    });

    // Adding a listener
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    // Removing a listener
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
