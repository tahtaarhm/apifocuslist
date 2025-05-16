const dbPool = require('../config/database');

const createUser = async (body) => {
  const users_query = `
      INSERT INTO users (username, email, no_handphone, password) 
      VALUES (?, ?, ?, ?)
    `;
  const [result] = await dbPool.execute(users_query, [body.username, body.email, body.no_handphone, body.password]);

  return result;
};

const getUserByUsername = async (username) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    const [rows] = await dbPool.execute(query, [username]);
    return rows;
  };

module.exports = {
    createUser,getUserByUsername
}