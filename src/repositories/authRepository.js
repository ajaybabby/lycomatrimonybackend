const db = require('../config/db');

const findUserByEmail = async (email) => {
  try {
    const query = 'SELECT id, email, password FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail
};