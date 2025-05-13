const interestService = require('../services/interestService');

const sendInterest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    
    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: 'Sender and receiver IDs are required'
      });
    }

    const result = await interestService.sendInterest(
      parseInt(senderId), // Convert string to number
      parseInt(receiverId) // Convert string to number
    );
    
    res.status(201).json({
      success: true,
      message: 'Interest sent successfully',
      data: result
    });
  } catch (error) {
    console.error("Interest sending error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  sendInterest
};