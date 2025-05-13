const db = require('../config/db');

const createSubscription = async (subscriptionData) => {
  try {
    const query = `
      INSERT INTO subscriptions (
        user_id, 
        plan_type, 
        amount, 
        start_date,
        expiry_date,
        payment_status
      ) VALUES (?, ?, ?, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 30 DAY), 'completed')
    `;

    const values = [
      subscriptionData.userId,
      subscriptionData.planName.toLowerCase(),
      subscriptionData.amount
    ];

    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSubscription
};