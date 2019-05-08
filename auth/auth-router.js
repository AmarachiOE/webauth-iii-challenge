// Packages
const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Environmental Variables
const secrets = require("../config/secrets.js");

// Data
const usersDb = require("../users/users-model.js");

// ========  For endpoints beginning with /api/auth

// Register
authRouter.post("/register", (req, res) => {

});


// Login
authRouter.post("/login", (req, res) => {

});

function generateToken(user) {
    
}

module.exports = authRouter;