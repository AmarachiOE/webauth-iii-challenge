// Packages
const usersRouter = require("express").Router();

// Data
const usersDb = require("./users-model");

// Middleware
const restricted = require("../auth/restricted-middleware.js");
const checkDep = require("../auth/checkDep-middleware.js");
const checkAdmin = require("../auth/checkAdmin-middleware.js");

// ========  For endpoints beginning with /api/users


usersRouter.get("/", restricted, (req, res) => {
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




// attempted stretch
/*
usersRouter.get("/", restricted, checkAdmin('admin'), async (req, res) => {
  try {
    const users = await usersDb;
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({  err });
  }
});
*/

// attempted stretch

usersRouter.get("/:department", restricted, checkDep, (req, res) => {
  const dep = req.params.department;
  console.log(dep);
  usersDb
    .findDep(dep)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ error: "There is no department with this name." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "This department's information could not be retrieved."
      });
    });
});

module.exports = usersRouter;
