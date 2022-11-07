// Source from Jim's AuthAutho demo

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**
 * Guards are middleware that "protect" route functions
 **/


/**
 * Make sure the user is logged in
 **/

function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req); // _ used for private methods (used within the file);

    try {
        // Throws error on invalid/missing token
        jwt.verify(token, SECRET_KEY);
        // If we get here, a valid token was passed
        next();
    } catch (err) {
        res.status(401).send({ error: "Unauthorized "});
    }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/

function ensureSameUser(req, res, next) {
    let token = _getToken(req); 

    try {
        // Throws error on invalid/missing token
        let payload = jwt.verify(token, SECRET_KEY);
        // If we get here, a valid token was passing
        // NOTE: userId received from the users route, req.params
        if (payload.userId === Number(req.params.userId)) {
            next();
        } else {
            res.status(403).send({ error: "Forbidden" });
        }
    } catch (err) {
        res.status(401).send({ error: "Unauthorized" });
    }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

function _getToken(req) {
    // Return "" if header not found
    if ( !("authorization" in req.headers) ) {
        return "";
    }

    // Split header into "Bearer" and token
    let authHeader = req.headers["authorization"];
    let [str, token] = authHeader.split(" "); // In request Header, there should be Authorization: Bearer Token

    return (str === "Bearer") ? token : "";
}

module.exports = {
    ensureUserLoggedIn,
    ensureSameUser
}

