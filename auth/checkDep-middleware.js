// Middleware: allows client access to list of users from their same department


function checkDep(dep) {
    return function(req, res, next) {
      if (
        req.decodedToken && // decodedToken present?
        req.decodedToken.department && // dep key present?
        req.decodedToken.department.includes(dep) // is dep the dep of interest?
      ) {
        next();
      } else {
        // 401 unauthorized
        // 403 forbidden (we know who you are, but you're not allowed)
        res.status(403).json({ error: "Can't touch this!" });
      }
    };
  }

  module.exports = checkDep;
