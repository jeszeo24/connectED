// Source: Jim's Web Sockets demo

var express = require("express");
var router = express.Router();
require("dotenv").config();
const db = require("../model/helper");
const Pusher = require("pusher");

// Number of prior messages to GET
const GET_MESSAGE_COUNT = 10;

// Initialize the Pusher connection
const channel = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap1",
    useTLS: true
});

// GET the most recent messages for channel
router.get("/:groupId", async function (req, res) {
    let { groupId } = req.params;

    try {
        let sql = `
            SELECT * FROM messages
            WHERE groupId = ${groupId}
            ORDER BY dateTime DESC
            LIMIT ${GET_MESSAGE_COUNT}
            `;
            let results = await db(sql);
            res.send( results.data.reverse () ); // return in chronological order
        } catch(err) {
            res.status(500).send({ error: err.message });
        }
    });

// Save new message in DB and publish to Pusher
router.post("/:groupId/:senderId", async function (req, res) {
    let { senderId, groupId } = req.params;
    let { text, socketId } = req.body;

    // Escape possible single quotes in text before writing to the DB
    let text4db = text.replace(/\'/g, "\\'");

    // Add the message to the DB
    let completeMsg = null;
    try {
        let sql = `
            INSERT INTO messages (senderId, groupId, text)
            VALUES (${senderId}, ${groupId}, "${text4db}");

            SELECT LAST_INSERT_ID() 
        `;
        let results = await db(sql);
        let completeMsgId = results.data[0].insertId; // insertId comes from sql SELECT LAST_INSERT_ID() / special property of data
        // Return "complete" message (with ID and date/time)
        results = await db(`SELECT * FROM messages WHERE id = ${completeMsgId}`);
        completeMsg = results.data[0];
    } catch (err) {
        res.status(500).send({ error: err.message });
        return;
    }

    // What's the channel name for these two users? Something like "channel-1-2"
    let channelName = "channel-" + groupId;

    // Publish message to Pusher to broadcast on the users' channel
    // Include sender's socketId so sender won't receive message (when each end opens, each get a unique web socketId)
    // the kind of event could be alert, status, message etc.
    channel.trigger(channelName, "message", completeMsg, { socket_id: socketId });

    // Return message to sender in response instead; it's faster (so client gets it immediately for better user experience)
    res.send(completeMsg);
});

module.exports = router;