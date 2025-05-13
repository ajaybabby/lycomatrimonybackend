const interestRepository = require('../repositories/interestRepository');

const sendInterest = async (sender_id, receiver_id) => {
  try {
    // Check if interest already exists
    const existingInterest = await interestRepository.checkExistingInterest(sender_id, receiver_id);
    if (existingInterest) {
      throw new Error('Interest already sent to this profile');
    }
    return await interestRepository.createInterest(sender_id, receiver_id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendInterest
};