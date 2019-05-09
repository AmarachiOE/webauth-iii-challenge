// Middleware: allows client access to list of users from their same department

// STRETCH

function checkAdmin(department){
  return async (req, res, next) => {
    if (req.decodedToken && req.decodedToken.department & req.decodedToken.department.includes(department)) {
      next();
    } else {
      const users = await db("users").where({ "users.department" : req.decodedToken.department });
      res.status(200).json(users);
    }
  }
}

module.exports = checkAdmin;
