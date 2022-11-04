// Source: Jim's Web Sockets demo

import React, { useEffect, useRef } from "react";
import "./ChatList.css";


function ChatList(props) {
    let listDiv = useRef(null);

// When new msg is added, scroll if necessary so it's visible
useEffect(() => {
    let lastPara = listDiv.current.lastElementChild;
    if (lastPara) {
        lastPara.scrollIntoView(false);
    }
}, [props.messages]); // receives messages from parent Chat

function formatDT(dt) {
    return new Date(dt).toLocaleString();
}

return (
    <div className="ChatList" ref={listDiv}>
       {props.messages.map((m) => (
        <div key={m.id}>
          {m.senderId === props.user.id ? (
            <div>
              <div key={m.id} className="sender">
                <span title={formatDT(m.dateTime)}>{m.text}</span>
    
              </div>
            </div>
          ) : (
            <div key={m.id}>
              <div className="receiver">
                {props.users.map((user) =>
                  user.id === m.senderId ? (
                    <div key={user.id}>{user.fullname}</div>
                  ) : (
                    <div key={user.id}></div>
                  )
                )}

                <span title={formatDT(m.dateTime)}>{m.text}</span>
            
              </div>
            </div>
          )}
        </div>
      ))}
          
        </div>
  );
}

export default ChatList;