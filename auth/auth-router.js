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
  let user = req.body;

  if (!user.username || !user.password || !user.department) {
    res.status(400).json({
      error: "Please include a username, password, and department to register."
    });
  } else {
    // hash the password
    const hash = bcrypt.hashSync(user.password, 10); // 2^n rounds = salt
    user.password = hash;

    usersDb
      .add(user)
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({
          message: `Registration success! Welcome ${user.username}!`,
          user,
          token
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error registering this user to the database."
        });
      });
  }
});

// Login
authRouter.post("/login", (req, res) => {
  let { username, password } = req.body;

  usersDb
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // <<< token
        res.status(200).json({
          message: `Login success! Welcome ${user.username}!`,
          user,
          token
        }); // <<< token
      } else {
        res.status(401).json({ error: "You shall not pass!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Uh oh! There was an error logging you in." });
    });
});

// Token
function generateToken(user) {
  // <<< token
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  secret = secrets.jwtSecret;

  const options = {
    expiresIn: "5h"
  };

  return jwt.sign(payload, secret, options);
}

// Logout

module.exports = authRouter;
