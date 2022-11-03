import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

function Chat(props) {
    const [messages, setMessages] = useState([]);
    const pusherRef = useRef(null); // store a value that will be maintained/not lost between renders (not reactive/won't be lost/recalculated when rerenders)
    const socketIdRef = useRef(null);

    // Connect to Pusher; called once, when component mounts
    useEffect(() => {
        Pusher.logToConsole = true; // useful for debugging!

        // Establish connection with Pusher
        // pusherkey is stored in client's .env file

        // COMMENTED OUT BELOW, HARDCODED IT INTO
        let pusherKey = process.env.REACT_APP_PUSHER_KEY;
        let options = {cluster: "ap1", forceTLS: true };
        pusherRef.current = new Pusher("944c0d1446e60e62c9a5", options); // made a connection to Pusher, want to keep the connection (and not lose it everytime page rerenders - hence useRef)
        // NOTE: useRef has a property called "current"


        // Save socket ID; we send it to server so we don't get sent our own messages
        pusherRef.current.connection.bind("connected", () => {
            socketIdRef.current = pusherRef.current.connection.socket_id; // find socketId
        });

        // Cleanup function: Disconnect when component unmounts ()
        // function in useEffect can also return a function, which is something that is executed when useEffect function ends
        return () => {
            pusherRef.current.disconnect();
        }
    }, []); 


    // Subscribe to a channel; called whenever participants change
    // NOTE: Channel stays open as long as one person is subscribed (no one subscribed, channel closes)
    useEffect(() => {
        // Return immediately if sender/receiver are the same
        if (props.senderId === props.receiverId) {
            return;
        }

        // Create channel name from sender/receiver IDs
        // Something like: "channel-1-2"
        let ids = [props.senderId, props.receiverId].sort();
        let channelName = "channel-" + ids.join("-");

        // Subscribe to channel
        let channel = pusherRef.current.subscribe(channelName);

        // Listen for messages broadcast on channel
        channel.bind("message", function (msg) {
            setMessages(messages => [...messages, msg]);
        });

        // Cleanup function: Unsubscribe when participant changes
        return () => {
            pusherRef.current.unsubscribe(channelName);
        }
    }, [props.senderId, props.receiverId]);

    useEffect(() => {
        // Call whenever participants change
        getRecentMessages();
    }, [props.senderId, props.receiverId]);

    // Load previous messages from DB
    async function getRecentMessages() {
        try {
            let response = await axios.get(`/chat/${props.senderId}/${props.receiverId}`);
            setMessages(response.data);
        } catch (err) {
            if (err.response) {
                let r = err.response
                console.log(`Server error: ${r.status} ${r.statusText}`);
            } else {
                console.log(`Network error: ${err.message}`);
            }
        }
    }

    // POST user-entered text to server as message
    async function sendMessage(text) {
        try {
            // Send text and socketId to our server
            let body = {text, socketId: socketIdRef.current };
            let response = await axios.post(`/chat/${props.senderId}/${props.receiverId}`, body); // post to our server
            // Server responds with "complete" msg (including ID and date/time)
            let completeMsg = response.data;
            setMessages(messages => [...messages, completeMsg]); // update messages 
            // setting ourselves is faster, which is why send socketId to Pusher so Pusher will not broadcast to Sender
        } catch (err) {
            if (err.response) {
                let r = err.response
                console.log(`Server error: ${r.status} ${r.statusText}`);
            } else {
                console.log(`Network error: ${err.message}`);
            }
        }
    }

    return (
        <div className="Chat">
            <ChatList messages={messages} senderId={props.senderId} /> {/* Chat receives senderId from parent ChatView*/}
            <ChatInput sendCb={text => sendMessage(text)} /> {/* receive text from child ChatInput, and uses it in sendMessage function */}
        </div>
    );
}

export default Chat;