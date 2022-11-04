// Source: Jim's Web Sockets demo

import React, { useState } from "react";
import "./ChatInput.css";

function ChatInput(props) {
    const [text, setText] = useState("");

    function handleChange(event) {
        setText(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.sendCb(text); // send text to parent Chat, with callback function sendCb
        setText("");
    }

    return (
        <div className="ChatInput">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={text}
                    onChange={handleChange}
                />

            </form>
        </div>
    );
}

export default ChatInput;
