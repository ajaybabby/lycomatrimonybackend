const astrologyRepository = require('../repositories/astrologyRepository');

const saveAstrologyPreferences = async (userId, data) => {
  return await astrologyRepository.saveAstrologyPreferences(userId, data);
};

const getAstrologyPreferences = async (userId) => {
  return await astrologyRepository.getAstrologyPreferences(userId);
};

const searchByPreferences = async (userId, preferences) => {
  try {
    return await astrologyRepository.searchByPreferences(
      parseInt(userId),
      {
        zodiacSign: preferences.zodiacSign,
        nakshatra: preferences.nakshatra,
        rashi: preferences.rashi,
        manglik: preferences.manglik
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveAstrologyPreferences,
  getAstrologyPreferences,
  searchByPreferences
};