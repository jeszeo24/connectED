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
    <div className="ChatList rounded mb-1" ref={listDiv}>
    {
        props.messages.map(m => (
            <p
                key={m.id}
                className={ m.senderId === props.senderId ? "sender" : "receiver" } 
            > {/* receives senderId from parent Chat */}
                <span title={formatDT(m.dateTime)}>{m.text}</span>
            </p>
        ))
    }
    </div>
    );
}

export default ChatList;