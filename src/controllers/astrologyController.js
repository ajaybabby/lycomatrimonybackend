const astrologyService = require('../services/astrologyService');

const saveAstrologyPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await astrologyService.saveAstrologyPreferences(userId, req.body);
    
    res.status(201).json({
      success: true,
      message: 'Astrology preferences saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Save astrology preferences error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAstrologyPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const preferences = await astrologyService.getAstrologyPreferences(userId);
    
    if (!preferences) {
      return res.status(404).json({
        success: false,
        message: 'Astrology preferences not found'
      });
    }

    res.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Get astrology preferences error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const searchByPreferences = async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    if (!userId || !preferences) {
      return res.status(400).json({
        success: false,
        message: 'User ID and preferences are required'
      });
    }

    const matches = await astrologyService.searchByPreferences(userId, preferences);

    res.json({
      success: true,
      data: {
        matches,
        count: matches.length
      }
    });
  } catch (error) {
    console.error('Astrology search error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add to module.exports
module.exports = {
  saveAstrologyPreferences,
  getAstrologyPreferences,
  searchByPreferences
};