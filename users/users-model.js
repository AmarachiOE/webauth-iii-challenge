const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
  };
  
  function find() {
    return db('users').select('id', 'username', 'password');
  }
  
  function findBy(filter) {
    return db('users').where(filter);
  }

  // for register
  async function add(user) {
    const [id] = await db('users').insert(user);
  
    return findById(id);
  }
  
  // for login
  function findById(id) {
    return db('users')
      .where({ id: Number(id) })
      .first();
  }