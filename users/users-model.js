const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findDep
};

function find() {
  return db("users").select("id", "username", "password", "department");
}

function findBy(filter) {
  return db("users").where(filter); // .first() on login route
}

// for register
async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id: Number(id) })
    .first();
}

// STRETCH: check Department
function findDep(department) {
    return db("users").where({department});
  }

