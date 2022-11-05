// Source from Jim's AuthAutho demo

var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config"); // need tp create config.js file on server side
const db = require("../model/helper")


/**
 * Register a user
 **/

router.post('/register', async (req, res) => {
    let { username, password, email, isStaff } = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR); // WORK_FACTOR: how secure and how long it will take to load (smaller value, means runs faster)
    // bcrypt returns a string about 200 characters long

    try {
        // store hashed password in database
        let sql = `
            INSERT INTO users (username, password, email, isStaff)
            VALUES ("${username}", "${hashedPassword}", "${email}", "${isStaff}")
            `;
        await db(sql);
        res.send({ message: "Registration succeeded" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


/**
 * Log in a user
 **/

router.post("/login", async (req, res) => {
    let { username, password } = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = "${username}"`);
        if (results.data.length === 0) {
            // Username not found
            res.status(401).send({ error: "Login failed "});
        } else {
            let user = results.data[0]; // the user's row/record from the DB
            let passwordsEqual = await bcrypt.compare(password, user.password);
            if (passwordsEqual) {
                // Passwords match
                let payload = { userId: user.id };
                // Create token containing user ID
                let token = jwt.sign(payload, SECRET_KEY); // Generate the JWT using the secret key
                // Also return user (without password)
                delete user.password;
                res.send({ // GET data with JWT in the Header
                    message: "Login succeeded",
                    token: token,
                    user: user
                });
            } else {
                // Pass words don't match
                res.status(401).send({ error: "Login failed "});
            }
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;