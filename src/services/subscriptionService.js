const subscriptionRepository = require('../repositories/subscriptionRepository');

const createSubscription = async (subscriptionData) => {
  try {
    return await subscriptionRepository.createSubscription({
      userId: parseInt(subscriptionData.userId),
      planName: subscriptionData.planName,
      amount: parseFloat(subscriptionData.amount)
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSubscription
};