const profileService = require('../services/profileService');

const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const profile = await profileService.createProfile(profileData);
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(id);
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json({ success: true, data: profiles });
  } catch (error) {
    console.error("Profiles fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMatches = async (req, res) => {
  try {
    const userId = req.params.id;
    const matches = await profileService.getMatches(userId);
    res.json({
      success: true,
      data: matches
    });
  } catch (error) {
    console.error("Match finding error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const savePreferences = async (req, res) => {
  try {
    const userId = req.params.id;
    const preferencesData = req.body;
    const result = await profileService.savePreferences(userId, preferencesData);
    
    res.status(201).json({
      success: true,
      message: 'Preferences saved successfully',
      data: result
    });
  } catch (error) {
    console.error("Preference saving error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDetails = await profileService.getUserDetails(userId);
    
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: userDetails
    });
  } catch (error) {
    console.error("User details fetch error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createProfile,
  getProfileById,
  getAllProfiles,
  getMatches,
  savePreferences,
  getUserDetails  // Add this to exports
};