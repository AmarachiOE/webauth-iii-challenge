// Packages
const usersRouter = require("express").Router();

// Data
const usersDb = require("./users-model");

// Middleware
const restricted = require("../auth/restricted-middleware.js");
const checkDep = require("../auth/checkDep-middleware.js");

// ========  For endpoints beginning with /api/users

usersRouter.get("/", restricted, checkDep('web'), (req, res) => {
  usersDb
    .find()
    .then(users => {
      res.status(200).json({ users, decodedToken: req.decodedToken });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

module.exports = usersRouter;
