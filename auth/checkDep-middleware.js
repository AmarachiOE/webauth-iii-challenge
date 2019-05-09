// Middleware: allows client access to list of users from their same department

// STRETCH


function checkDep(req, res, next) {
  if (
    req.decodedToken && // decodedToken present?
    req.decodedToken.department && // dep key present?
    req.decodedToken.department.includes(req.params.department) // is client's department the same department in url?
  ) {
    next();
  } else {
    // 401 unauthorized
    // 403 forbidden (we know who you are, but you're not allowed)
    res.status(403).json({ error: "Can't touch this!" });
  }
}

module.exports = checkDep;
