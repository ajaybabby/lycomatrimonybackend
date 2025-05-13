const subscriptionService = require('../services/subscriptionService');

const createSubscription = async (req, res) => {
  try {
    const { userId, planName, amount } = req.body;

    if (!userId || !planName) {
      return res.status(400).json({
        success: false,
        message: 'User ID and plan name are required'
      });
    }

    const result = await subscriptionService.createSubscription({ userId, planName, amount });
    
    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: result
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSubscription
};