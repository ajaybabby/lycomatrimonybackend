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

const getUserSubscription = async (userId) => {
  try {
    const query = `
      SELECT 
        s.plan_type,
        s.start_date,
        s.expiry_date
      FROM subscriptions s
      WHERE s.user_id = ? 
        AND s.expiry_date > CURRENT_TIMESTAMP
      ORDER BY s.created_at DESC 
      LIMIT 1
    `;
    
    const [rows] = await db.query(query, [userId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  getUserSubscription
};