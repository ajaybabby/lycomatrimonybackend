const db = require('../config/db');

const createInterest = async (sender_id, receiver_id) => {
  try {
    const query = `
      INSERT INTO interests (sender_id, receiver_id, status)
      VALUES (?, ?, 'pending')
    `;
    const [result] = await db.query(query, [sender_id, receiver_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

const checkExistingInterest = async (sender_id, receiver_id) => {
  try {
    const query = `
      SELECT * FROM interests 
      WHERE sender_id = ? AND receiver_id = ?
    `;
    const [rows] = await db.query(query, [sender_id, receiver_id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createInterest,
  checkExistingInterest
};