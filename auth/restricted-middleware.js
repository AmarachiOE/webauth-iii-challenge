// Middleware: allows access to list of users only if valid token is present on authorization prop in headers


// Packages
const jwt = require("jsonwebtoken");

// Environmental Variables
const secrets = require("../config/secrets.js");


function restricted(req, res, next) {
    const token = req.headers.authorization; // need authorization prop on headers with token pasted from login success

    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ error: "Bad token. You shall not pass!" })
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    })
};

module.exports = restricted;