import React from "react";
import "../css/SidebarChat.css";

import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className="sidebar__chat">
      <Avatar />
      <div className="sidebar__chat__info">
        <h2>Room Name</h2>
        <p>Last Message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
