const profileRepository = require('../repositories/profileRepository');

const createProfile = async (profileData) => {
  try {
    return await profileRepository.createProfile(profileData);
  } catch (error) {
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    const profile = await profileRepository.getProfileById(id);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  } catch (error) {
    throw error;
  }
};

const getAllProfiles = async () => {
  try {
    return await profileRepository.getAllProfiles();
  } catch (error) {
    throw error;
  }
};

const getMatches = async (userId) => {
  try {
    const matches = await profileRepository.getMatchingProfiles(userId);
    return matches;
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (userId) => {
  try {
    return await profileRepository.getUserDetails(userId);
  } catch (error) {
    throw error;
  }
};

const savePreferences = async (userId, preferencesData) => {
  try {
    return await profileRepository.saveUserPreferences(userId, preferencesData);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProfile,
  getProfileById,
  getAllProfiles,
  getMatches,
  savePreferences,
  getUserDetails
};