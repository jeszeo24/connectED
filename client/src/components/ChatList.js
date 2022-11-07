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

  console.log(props.messages); // NOTE: senderId is ALWAYS 1
  // props.users ? console.log(props.users) : null;

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
                <span title={formatDT(m.dateTime)}>{m.text}</span>
                <div className="receivername">
                  {props.users.map((u) =>
                    u.id === m.senderId ? (
                      <small key={u.id}>{u.username}</small>
                    ) : (
                      <div key={u.id}></div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
